const mongoose = require('mongoose')


const pwdresetSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    resetString: {
        type: String
    },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    }
})

module.exports = mongoose.model('Pwdreset', pwdresetSchema)