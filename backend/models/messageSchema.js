const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
    },
    content: {
        type: String
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
},
{
    timestamps: true,
    toJSON: {virtuals: true}
}
)

module.exports = mongoose.model('Message', messageSchema)