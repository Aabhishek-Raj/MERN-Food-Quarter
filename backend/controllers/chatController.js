const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatSchema')
const Message = require('../models/messageSchema')
const Supplier = require('../models/supplierSchema')
const User = require('../models/userSchema')

module.exports.accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body

    if (!userId) {
        return res.status(400).json({ message: "Not allowed to chat" })
    }

    let chat = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate('chatters', '-password').populate('latestmsg')

    chat = await User.populate(chat, {
        path: 'latestmsg.sender',
        select: 'name email'
    })

    if (chat?.length > 0) {
        res.send(chat[0])
    }

    if (!chat?.length) {
        const chatData = {
            chatname: 'sender',
            chatters: [req.user._id, userId]
        }

        const createdChat = await Chat.create(chatData)

        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('chatters', '-password')

        res.status(200).send(fullChat)
    }
})

module.exports.fetchChats = asyncHandler(async (req, res) => {
    const chats = await Chat.find({ chatters: { $elemMatch: { $eq: req.user._id } } }).populate('chatters', '-password').populate('latestmsg').sort({ updatedAt: -1 })

    const allChats = await User.populate(chats, {
        path: 'latestmsg.sender',
        select: 'name pic email'
    })

    if (!allChats) {
        res.status(400).json({ message: "You haven't started any Chat" })
    }

    res.status(200).json(allChats)
})

module.exports.sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId, } = req.body

    if (!content || !chatId) {
        return res.status(400).json({ message: "Invalid" })
    }

    let newMsg = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    let message = await Message.create(newMsg)

    message = await message.populate('sender', 'name email')
    message = await message.populate('chat')
    message = await User.populate(message, {
        path: 'Chat.chatters',
        select: 'name, email'
    })

    await Chat.findByIdAndUpdate(req.body.chatId, {
        latestmsg: message
    })

    res.json(message)
})

module.exports.allMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({ chat: req.params.chatId }).populate('sender', 'name email').populate('chat')

    res.json(messages)
})

//@desc Get all users by searching
//@route GET /allusersearch
//@access Private
module.exports.userSearch = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
        ]
    }: {}

    const supplier = await Supplier.find(keyword)

    res.status(200).json(supplier)

    console.log(keyword)
})
