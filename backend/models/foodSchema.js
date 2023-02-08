const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Supplier'
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    variety: {
        type: String,
        required: true
    },
    calory: {
        type: Number,
        // required: true,
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('food', foodSchema)