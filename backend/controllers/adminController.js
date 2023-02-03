const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminSchema')
const User = require('../models/userSchema')
const Supplier = require('../models/supplierSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { response } = require('express')

//@desc admin signup
//@route POST /
//@access Public
module.exports.adminSignUp = asyncHandler(async (req, res) => {
    const { adminname, email, phone, password, location } = req.body

    if (!adminname || !email || !phone || !password || !Array.isArray(location) || !location.length) {
        return res.status(400).json({ message: 'All Data Feilds are required' })
    }

    const duplicate = await Admin.findOne({ email }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'You have already registered as an Admin' })
    }

    const hashedpwd = await bcrypt.hash(password, 10)

    const adminObj = { adminname, email, phone, password: hashedpwd, location }

    const admin = await Admin.create(adminObj)

    //adding admin token 
    const token = jwt.sign({
        'AdminInfo': {
            'adminId': admin._id,
            'adminname': admin.adminname,
            'roles': admin.roles,
        }
    }, process.env.ADMIN_TOKEN,
        { expiresIn: '10d' })

    if (admin) {
        res.status(201).json({ admin, token })
    } else {
        res.status(400).json({ message: 'Invalid Admin details' })
    }

})

//@desc admin signin
//@route POST /signin
//@access Public
module.exports.adminSignIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'All Fields are required' })
    }

    const foundAdmin = await Admin.findOne({ email }).exec()

    if (!foundAdmin) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundAdmin.password)
    if (!match) {
        return res.status(401).json({ message: 'Invalid Credentials' })
    }

    const token = jwt.sign({
        'AdminInfo': {
            'adminId': foundAdmin._id,
            'adminname': foundAdmin.adminname,
            'roles': foundAdmin.roles,
        }
    }, process.env.ADMIN_TOKEN,
        { expiresIn: '10d' })

    res.status(200).json({ admin: foundAdmin, token })

})

//@desc Get all users
//@route GET /allusers
//@access Private
module.exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({ message: 'No Users Found' })
    }

    res.json(users)
})

//@desc Get verified suppliers
//@route GET /allsuppliers
//@access Private
module.exports.getVerifiedSuppliers = asyncHandler(async (req, res) => {
    const supplier = await Supplier.find({ isVerified: true }).select('-password').lean().exec()

    if (!supplier?.length) {
        return res.status(400).json({ message: 'No Supplier Found' })
    }

    res.json(supplier)
})

//@desc Get new supplier request
//@route GET /notverified
//@access Private
module.exports.getSupplierRequest = asyncHandler(async (req, res) => {
    const supplier = await Supplier.find({ isVerified: false }).select('-password').lean().exec()

    if (!supplier?.length) {
        return res.status(400).json({ message: 'No new Request' })
    }
    res.json(supplier)
})

//@desc Block an user
//@route POST /blockuser
//@access Private
module.exports.blockUser = asyncHandler(async (req, res) => {
    const userId = req.params
    console.log(userId)
})

//@desc Send Email
//@route GET  /send
//@access Private
function sendEmail(){

    return new Promise((resolve, reject) => {

        let transports = nodemailer.transports({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        })

        const mail_configs = {
            from: '',
            to: '',
            subject: 'Testing the emil of food app',
            text: 'Sorry !! You have been rejected by the admin'
        }
        transports.sendEmail(mail_configs, function(err, info ){
            if(err){
                return reject({message: 'An error has ocured'})
            }
            return resolve({message: "Email send Sucessfully"})
        })
    })
}



//@desc Verify the supplier
//@route PATCH   /verifysupplier
//@access Private
module.exports.verifySupplier = asyncHandler(async (req, res) => {
    const { supplierId } = req.body

    const supplier = await Supplier.findByIdAndUpdate(supplierId, { isVerified: true })

    res.json(`${supplier.name} has been verified and added`)
})

module.exports.rejectSupplier = asyncHandler(async (req, res) => {

    const { supplierId } = req.body

    sendEmail()
        .then(response => console.log(response.message))
        .catch(err => console.log(err.message))


    const supplier = await Supplier.findById(supplierId)


})
