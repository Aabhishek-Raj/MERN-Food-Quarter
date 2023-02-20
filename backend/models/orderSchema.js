const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deliveryaddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    items: {
        type: [],
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }

},
    {
        timestamps: true
    })

module.exports = mongoose.model('Order', orderSchema)

