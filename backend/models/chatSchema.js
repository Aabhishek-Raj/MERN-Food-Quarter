const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    chatname: {
        type: String,
        trim: true
    }   ,
    chatters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: ["User", "Supplier"]
        }
    ],
    latestmsg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Chat', chatSchema  )