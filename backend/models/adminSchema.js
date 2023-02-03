const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    adminname: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number
    },
    password: {
        type: String
    },
    location:{
        type: [String]   
    },
    roles: {
        type: [String],
        default: ['Admin']
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Admin', adminSchema)