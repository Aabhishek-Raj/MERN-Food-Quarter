const mongoose = require ('mongoose')

const verifySchema = new mongoose.Schema({
    userId: {
        type: String
    },
    OTP: {
        type: String
    },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    }

})

module.exports = mongoose.model('Verification', verifySchema)