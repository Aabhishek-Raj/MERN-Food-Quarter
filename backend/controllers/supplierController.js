const Supplier = require('../models/supplierSchema')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { uploadFile } = require('../s3')




module.exports.register = asyncHandler(async(req, res) => {
    // console.log(req.body)
    const file = req.file;
    console.log(file)
    const result = await uploadFile(file)
    console.log(result) 
    res.send({imagePath: `/supplier/register/${result.Key}`})

//   const foodLicense = req.files[0];
    // const {name, password, email, phone, location, foodLicense, description, image} = req.body

    // if(!name || !password || !email || !phone || !location || !foodLicense || !description || !image) {

    //     return res.status(400).json({message: 'All Fields are required'})
    // }

    // const emailduplicate = await Supplier.findOne({email}).lean().exec()
    // const nameduplicate = await Supplier.findOne({name}).lean().exec()
    // if(emailduplicate || nameduplicate) {
    //     return res.status(409).json({message: "An Account with same company details exist"})
    // }

    // const hashedpwd = await bcrypt.hash(password, 10)

    // const supplierObj = {name, password: hashedpwd, email, phone, location, foodLicense, description,image}
    // const supplier = await Supplier.create(supplierObj)

    // const SupplierToken = jwt.sign(
    //     {
    //         'SupplierInfo': {
    //             supplierId:supplier._id,
    //             suppliername: supplier.name,
    //         }
    //     }, 
    //     process.env.SUPPLIER_TOKEN,
    //     {expiresIn: '10d'}
    // )
    // if(supplier){
    //     res.status(200).json({supplier, SupplierToken})
    // } else {
    //     res.status(400).json({message: 'Invalid Credentials'})
    // }
})


module.exports.login = asyncHandler( async (req, res) => {
    const {email, password} = req.body
    
    if(!email || !password) {
        return res.status(400).json({message: "All Feilds are required"})
    }
    
    const foundSupplier = await Supplier.findOne({email})
    if(!foundSupplier || !foundSupplier.isActive){
        return res.status(401).json({message: 'Unauthorised'})
    }
    const match = await bcrypt.compare(password, foundSupplier.password)

    if(!match) return res.status(401).json({message: 'Incorrect password'})

    if(!foundSupplier.isVerified) {
        return res.status(401).json({message: 'Verfication Under Process'})
    }
    
    const SupplierToken = jwt.sign(
        {
            'SupplierInfo': {
                supplierId: foundSupplier._id,
                suppliername: foundSupplier.name
            }
        },
        process.env.SUPPLIER_TOKEN,
        {expiresIn: '10d'}
    )

    res.status(200).json({ supplier: foundSupplier, SupplierToken})

})
