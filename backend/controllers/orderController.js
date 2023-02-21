const asyncHandler = require("express-async-handler");
const Address = require('../models/addressSchema')
const Razorpay = require('razorpay')
const crypto = require('crypto')
const Order = require('../models/orderSchema')

module.exports.addAddress = asyncHandler(async (req, res) => {
    const { data } = req.body

    if (!data) {
        return res.status(400).json({ message: 'All feilds are required' })
    }

    const address = await Address.findOneAndUpdate({ user: req.user._id }, { $push: { "address": data } }, { new: true, upsert: true })

    res.status(200).json(address)

})

module.exports.getAddress = asyncHandler(async (req, res) => {

    const addresses = await Address.findOne({ user: req.user._id })

    res.status(200).json(addresses.address)
})

module.exports.razorpayPayment = asyncHandler(async (req, res) => {
    const instance = new Razorpay({
        key_id: process.env.RAZ_KEY_ID,
        key_secret: process.env.RAZ_KEY_SECRET
    })

    const amount = req.body.amount * 100

    console.log(amount)

    const options = {
        amount,
        currency: 'INR',
        receipt: crypto.randomBytes(10).toString('hex')
    }

    instance.orders.create(options, (error, order) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ message: 'Something Went Wrong' })
        }

        res.status(200).json({ data: order })
    })
})

module.exports.paymentVerify = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response

    if (!razorpay_order_id && !razorpay_payment_id) {
        return res.status(200).json({ message: "no payment id" })
    }
    const sign = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSign = crypto.createHmac('sha256', process.env.RAZ_KEY_SECRET).update(sign.toString()).digest("hex")

    if (razorpay_signature === expectedSign) {

        const { pack, deliveryaddress } = req.body
        const supplierId = pack.items[0].supplierId

        const data = { user: req.user._id, supplierId, deliveryaddress, items: pack.items, total: pack.total, quantity: pack.quantity }

        await Order.create(data)

        return res.status(200).json({ message: "Payment verified successfully" })
    } else {
        return res.status(400).json({ message: 'Invalid signature sent' })
    }
})

module.exports.getAllOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({ supplierId: req.supplier.supplierId }).populate('user').populate('deliveryaddress')

    if (!orders) {
        return res.status(204)
    }

    res.status(200).json(orders)
})

module.exports.getOrderHistory = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate('supplierId')

    if (!orders) {
        res.status(400).json({ message: " NO orders yet" })
    }

    res.status(200).json(orders)
})

module.exports.getOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.query

    const order = await Order.findById(orderId).populate('user')

    if (!order) {
        return res.status(400).json({ message: "Order not found" })
    }

    res.status(200).json(order)
})

module.exports.getDeliveryAddress = asyncHandler(async (req, res) => {
    const { addressId, userId } = req.query

    const mongoose = require('mongoose')
    const ObjUserId = mongoose.Types.ObjectId(userId)
    const ObjAddressId = mongoose.Types.ObjectId(addressId)

    const address = await Address.aggregate([
        {
            $match: { user: ObjUserId }
        },
        {  
            $unwind: '$address' 
        },
        {
            $match: { 'address._id': ObjAddressId }
        },
        {
            // $arrayElemAt: ['$address', 0]
            $replaceRoot: { newRoot: "$address" } 
        },
        // {
        //     $project: {address: {$arrayElemAt:['$address', 0]}}
        // }   
    ])

    if(!address){      
        return res.status(400).json({message: 'Address not found'})   
    }
    console.log(address)

    res.status(200).json(address)
})                      