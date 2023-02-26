const User = require('../models/userSchema')
const Verification = require('../models/verifySchema')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid')
const path = require('node:path')
const Pwdreset = require('../models/pwdresetSchema')
const { accessSync } = require('node:fs')
const Supplier = require('../models/supplierSchema')

//@desc Send a mail
//@route nodemailer
//@access Public
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
    }
})

//@desc Testing Success
//@route nodemailer
//@acess Public
transporter.verify((error, success) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Ready for messages")
        console.log(success)
    }
})

//@desc Create new user
//@route POST /users
//@access Public
module.exports.signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All Fields are required' })
    }

    const duplicate = await User.findOne({ email }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Email Id already exist' })
    }

    const hashedpwd = await bcrypt.hash(password, 10)

    const userObject = { username, email, password: hashedpwd }
    const user = await User.create(userObject)

    //Adding Token 
    const Token = jwt.sign(
        {
            'UserInfo': {
                'userId': user._id,
                'username': user.username,
                'roles': user.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10d' }
    )

    if (user) {
        // Handle account verification
        sendVerificationEmail(user, res)
        // res.status(201).json({ user, Token })f
    } else {
        res.status(400).json({ message: 'Invalid user details' })
    }
})

//@desc Send verification email
//@route nodemailer
//@access Public
const sendVerificationEmail = ({ _id, email }, res) => {
    // url to be used in the eamil
    const currentUrl = "http://localhost:4000/"

    const OTP = uuidv4() + _id

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify Your Email",
        html: `<p>Verify your email address to complete the signup and login into you account.</p><p>This link <b>expires in 3 Minutes</b>.</p><p>Press <a href=${currentUrl + "users/verify/" + _id + "/" + OTP}> here</a> to proceed.</P>`,
    }

    const saltRounds = 10
    bcrypt
        .hash(OTP, saltRounds)
        .then((hashedOTP) => {
            const newVerification = new Verification({
                userId: _id,
                OTP: hashedOTP,
                createdAt: Date.now(),
                expiresAt: Date.now() + 120 * 1000,
            })

            newVerification
                .save()
                .then(() => {
                    transporter
                        .sendMail(mailOptions)
                        .then(() => {
                            // email send and verification record saved
                            res.status(200).json({ message: "Verification email send", _id, email})
                        })
                        .catch((error) => {
                            res.status(401).json({ message: "Verification email failed" })
                        })
                })
                .catch((error) => {
                    res.status(401).json({ message: "Counldn't save verification email data" })
                })
        })
        .catch(() => {
            res.json(401).json({ message: "An error occured while hashing email data" })
        })
}

//@desc verify email
//@route GET /verify
//@access Public
module.exports.verifyEmail = (req, res) => {
    let { userId, OTP } = req.params

    Verification
        .find({ userId })
        .then((result) => {
            if (result.length > 0) {
                //user verification record exists so we proceed

                const { expiresAt } = result[0]
                const hashedOTP = result[0].OTP

                //checking for otp expired or not 
                if (expiresAt < Date.now()) {
                    //record has expired so we delete it
                    Verification
                        .deleteOne({ userId })
                        .then((result) => {
                            User
                                .deleteOne({ _id: userId })
                                .then(() => {
                                    let message = "Link has expired. Please signup again."
                                    res.redirect(`/user/verified/error=true&message=${message}`)
                                })
                                .catch(error => {
                                    let message = "Clearing user with unique string failed"
                                    res.redirect(`/user/verified/error=true&message=${message}`)
                                })
                        })
                        .catch((error) => {
                            let message = "An error occurred while clearing expired user verification record"
                            res.redirect(`/user/verified/error=true&message=${message}`)
                        })

                } else {
                    // valid record exists so we validate the user string
                    // First compare the hashed unique string
                    bcrypt
                        .compare(OTP, hashedOTP)
                        .then(result => {
                            if (result) {
                                // string match
                                User.updateOne({ _id: userId }, { verified: true })
                                    .then(() => {
                                        Verification
                                            .deleteOne({ userId })
                                            .then(() => {
                                                res.sendFile(path.join(__dirname, "./../views/verified/html"))
                                            })
                                            .catch(error => {
                                                console.log(error)
                                                let message = "An error occured while finalizing successful verification."
                                                res.redirect(`/user/verified/error=true&message=${message}`)

                                            })
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        let message = "An error occured while updating the user record to show verified."
                                        res.redirect(`/user/verified/error=true&message=${message}`)
                                    })


                            } else {
                                // existing record but incorrect verification details passed.
                                let message = "Invalid verification details passed. Check your inbox."
                                res.redirect(`/user/verified/error=true&message=${message}`)
                            }
                        })
                        .catch(error => {
                            let message = "An error occurred while comparing OTP"
                            res.redirect(`/user/verified/error=true&message=${message}`)

                        })
                }

            } else {
                //user verification record doesn't exist
                let message = "Account record doesn't exist or has been verified already. Please signup or login"
                res.redirect(`/user/verified/error=true&message=${message}`)
            }
        })
        .catch((error) => {
            console.log(error)
            let message = "An error occurred while checking user verification record"
            res.redirect(`/user/verified/error=true&message=${message}`)

        })
}

//@desc verify email
//@route GET /verify
//@access Public
module.exports.resendEmail = asyncHandler( async (req, res) => {
    const { _id, email } = req.body

    if(!_id || !email ) {
        return res.status(400).json({message: "Error occured in resending "})
    }

    await Verification.deleteMany({userId: _id})
    sendVerificationEmail({_id, email}, res)

})

//@desc Login
//@route POST /auth
//@access Public
module.exports.signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const foundUser = await User.findOne({ email }).exec()

    if (!foundUser || !foundUser.isActive) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    //check if user is verified 
    if (!foundUser.verified) {
        return res.status(401).json({ message: "You are not verified yet . Check you inbox" })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Invalid credentials' })

    const Token = jwt.sign(
        {
            'UserInfo': {
                'userId': foundUser._id,
                'username': foundUser.username,
                'roles': foundUser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10d' }
    )

    res.status(200).json({ user: foundUser, Token })
})

//@desc Reset password
//@route POST /resetpassword
//@access Public 
module.exports.resetPassword =  asyncHandler( async(req, res) => {
    const { email, redirectUrl } = req.body

    const user = await User.findOne({email}).exec()

    if(!user){
        return res.status(400).json({message: "no user available"})
    }
     
    if(!user.verified){
        return res.status(401).json({message: " your mail hasn't been verified"})
    }

    sendResetEmail(user, redirectUrl, res)
})  

//@desc Password reset email
//@access Public
const sendResetEmail  = asyncHandler( async ({_id, email}, redirectUrl, res) => {
    const resetString = uuidv4() + _id

    //First clear all existing reset record
    const deleteExistingRecord = await Pwdreset.deleteMany({userId: _id})

    if(!deleteExistingRecord){
        return res.status(400).json({message: "nothing to clear in the reset"})
    }

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Password Reset",
        html: `<p>We heard that you lost your password. Don't Worry!</p><p>Use this link bleow to reset it </b>
        <b>This link expires in 60 minutes.</p><p>Press <a href=${redirectUrl + "/" + _id + "/" + resetString}> here</a> to proceed.</P>`,       
    }

    const hashedResetString = await bcrypt.hash( resetString, 10)

    const newPwdReset = new Pwdreset({
        userId: _id, resetString: hashedResetString, createdAt: Date.now(), expiresAt: Date.now() + 3600000
    })

    const newData = await newPwdReset.save()

    const sendmail = await transporter.sendMail(mailOptions) 

    if(sendmail){
        res.status(200).json({message: "Password Reset Email Send"})
    } else {
        res.status(400).json({message: "Couldn't send the mail"})
    }
})

//@desc change the password in db
//@route POST /changepassword
//@access Public
module.exports.changePassword = asyncHandler( async (req, res) => {
    const {userId, resetString, newPassword } = req.body
               
    const resetDataExist = await Pwdreset.findOne({userId})

    if(!resetDataExist) {
        return res.status(400).json({message: "resetString is not valid"})
    }

    if(resetDataExist.expiresAt < Date.now()) {
        return res(400).json({message: "Reset request timeout"})
    }
    const deleted = await Pwdreset.deleteOne({userId})

    //valid reset record exist so we validate the reset string
    const match = await bcrypt.compare(resetString, resetDataExist.resetString)

    if(!match){
        return res.status(400).json({message: "Comparing reset password failed"})
    }

    // hash new password and store
    const hashedNewPwd = await bcrypt.hash(newPassword, 10)

    const updateUser = await User.updateOne({_id: userId}, {password: hashedNewPwd})

    //now delete reset record
    await Pwdreset.deleteOne({userId})

    res.status(200).json({message: "Password has been reset successfully."})

})

//@desc Update a user
//@route PATCH /users
//@access Private
module.exports.updateUser = asyncHandler(async (req, res) => {
    const { id, username, email, phone, password, isActive, roles } = req.body

    if (!id, !username, !email, !phone, !password, !Array.isArray(roles), !roles.length, typeof isActive !== 'boolean') {
        return res.status(400).json({ message: 'All Fields are required ' })
    }

    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const duplicate = await User.findOne({ email }).lean().exec()
    //Allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Email Id already exist' })
    }

    user.username = username
    user.email = email
    user.phone = phone
    user.roles = roles
    user.isActive = isActive

    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()
    res.json({ message: `${updatedUser.username} is updated` })


})

//@desc Delete a user
//@route DELETE /users
//@access Private
module.exports.deleteUsers = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'User Id required' })
    }
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const deleted = await user.deleteOne()

    const replay = `User ${deleted.username} with id ${deleted.id} is deleted`
    res.json(replay)
})

//@desc Get top suppliers
//@route GET /topsuppliers
//@access Private
module.exports.getAllSuppliers = asyncHandler( async (req, res) => {
    
    const supplier = await Supplier.find({ isVerified: true, isActive: true }).select('-password').lean().exec()

    if (!supplier?.length) {
        return res.status(400).json({ message: 'No Supplier Found' })
    }

    res.status(200).json(supplier)
})

