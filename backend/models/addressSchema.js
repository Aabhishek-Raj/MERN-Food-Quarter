const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50
    },
    phoneNo: {
        type: String,
        required: true,
        trim: true      
    },
    pincode: {
        type: String,
        required: true,
        trim: true
    },
    locality: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50
    },
    address: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 60
    },
    district: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        min: 10,
        max: 40
    },
    alternatephone: {
        type: String
    },
    addressType: {
        type: String,
        required: true,
        enum: ['home', 'other'],
        required: true
    }
})


const userAddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    address: [addressSchema]
}, {timestamps: true})

module.exports = mongoose.model('Address', userAddressSchema)