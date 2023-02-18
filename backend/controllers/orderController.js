const asyncHandler = require("express-async-handler");
const Address = require('../models/addressSchema')
const Razorpay = require('razorpay')
const crypto = require('crypto')


module.exports.addAddress = asyncHandler( async (req, res) => {
    const { data } = req.body
    console.log(data)

    if(!data) {  
        return res.status(400).json({message: 'All feilds are required'})
    }

    const address = await Address.findOneAndUpdate({user: req.user._id}, {$push: { "address": data}}, {new: true, upsert: true})

    res.status(200).json(address)

})

module.exports.getAddress = asyncHandler( async (req, res) => {
   
    const addresses = await Address.findOne({user: req.user._id})

    res.status(200).json(addresses.address)
})

module.exports.razorpayPayment = asyncHandler( async (req, res) => {
    const instance = new Razorpay({
        key_id: process.env.RAZ_KEY_ID,
        key_secret: process.env.RAZ_KEY_SECRET
    })

    const amount =  req.body.amount * 100

    console.log(amount)

    const options = {
            amount,
            currency: 'INR',
            receipt: crypto.randomBytes(10).toString('hex')
    }

    instance.orders.create(options, (error, order) => {
        if(error){
            console.log(error)
            return res.status(500).json({message: 'Something Went Wrong'})
        }
        
        res.status(200).json({data: order})
    })
})

module.exports.paymentVerify = asyncHandler( async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response

    if(!razorpay_order_id && !razorpay_payment_id){
        return res.status(200).json({message: "no payment id"})
    }
    const sign = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSign = crypto.createHmac('sha256', process.env.RAZ_KEY_SECRET).update(sign.toString()).digest("hex")

        if(razorpay_signature === expectedSign) {
 


            return res.status(200).json({message: "Payment verified successfully"})
        } else {
            return res.status(400).json({message: 'Invalid signature sent'})
        } 
})