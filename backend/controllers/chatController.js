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
        user: req.user._id, supplier: userId
    }).populate('user', '-password').populate('supplier', '-password').populate('latestmsg')

    chat = await User.populate(chat, {
        path: 'latestmsg.sender',
        select: 'name email'
    })

    if (chat?.length > 0) {
        res.json(chat[0])
    }

    if (!chat?.length) {
        const chatData = {
            chatname: 'sender',
            user: req.user._id,
            supplier: userId
        }

        const createdChat = await Chat.create(chatData)

        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('user', '-password').populate('supplier', '-password')

        res.status(200).send(fullChat)
    }
})

module.exports.fetchChats = asyncHandler(async (req, res) => {
    const chats = await Chat.find({
        // $or: [
        //     { user: req.user._id },
        //     { supplier: req.supplier._id }
        // ]
    }).populate('user', '-password').populate('supplier', '-password').populate('latestmsg').sort({ updatedAt: -1 })

    // console.log(chats)

    const allChats = await User.populate(chats, {
        path: 'latestmsg.sender',
        select: 'name email'
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
        sender: req.user._id || req.supplier._id,
        content: content,
        chat: chatId
    }

    let message = await Message.create(newMsg)  

    message = await message.populate('sender', 'name username email')
    message = await message.populate('chat')
    if (req.user._id) {

        message = await User.populate(message, {
            path: 'Chat.user',
            select: 'username, email'  
        })
    } else {
        message = await Supplier.populate(message, {
            path: 'Chat.supplier',
            select: 'name, email'
        })

    }

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
    } : {}

    const supplier = await Supplier.find(keyword)

    res.status(200).json(supplier)

    console.log(keyword)
})
