const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required:true,
    },
    phone: {
        type: Number,
        required: true,
    },
    location: {     
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    foodLicense: {
        type: String,
    },
    image: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default:true
    }

})

module.exports = mongoose.model('Supplier', supplierSchema)