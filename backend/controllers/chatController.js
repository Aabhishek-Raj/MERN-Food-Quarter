const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatSchema')
const Message = require('../models/messageSchema')
const Supplier = require('../models/supplierSchema')
const User = require('../models/userSchema')

module.exports.createChat = asyncHandler( async (req, res) => {
    const { supplierId } = req.body

    if(!supplierId) {
        return res.status(400).json({message: "not allowed to message this supplier"})
    }
    
    let chat = await Chat.find({user: req.user._id, supplier: supplierId}).populate('user', '-password').populate('supplier', '-password').populate('latestmsg')

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
            supplier: supplierId
        }

        const createdChat = await Chat.create(chatData)
        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('user', '-password').populate('supplier', '-password')

        res.status(200).send(fullChat)
    }
})

module.exports.accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body
   
    if (!userId) {
        return res.status(400).json({ message: "Not allowed to chat" })
    }

    const query = {}
    if(req.user){
        query.user = req.user._id   
        query.supplier = userId
    }else {
        query.user = userId
        query.supplier = req.supplier.supplierId
    } 
    
    let chat = await Chat.find(query).populate('user', '-password').populate('supplier', '-password').populate('latestmsg')

    chat = await User.populate(chat, { 
        path: 'latestmsg.sender', 
        select: 'name email'
    })

    if (chat?.length > 0) {
        res.status(200).json(chat[0]) 
    }

    // if (!chat?.length) {   
    //     const chatData = {
    //         chatname: 'sender',
    //         user: req.user?._id,
    //         supplier: userId
    //     }

    //     const createdChat = await Chat.create(chatData)

    //     const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('user', '-password').populate('supplier', '-password')
    //     console.log(fullChat)

    //     res.status(200).send(fullChat)
    // }
})

module.exports.fetchChats = asyncHandler(async (req, res) => {

    const chats = await Chat.find({
        $or: [
            { user: req.user?._id },
            { supplier: req.supplier?.supplierId }
        ]
    }).populate('user', '-password').populate('supplier', '-password').populate('latestmsg').sort({ updatedAt: -1 })


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
    console.log(req.body)

    if (!content || !chatId) {
        return res.status(400).json({ message: "Invalid" })
    } 

    let newMsg = {
        sender: req.user ? [req.user._id]: [req.supplier.supplierId],
        content: content,
        chat: chatId
    }

    let msg = await Message.create(newMsg)

      msg = await msg.populate('chat') 

    if (req.user) { 

        msg = await User.populate(msg, {   
            path: 'chat.user',
            select: 'username email roles'  
        }) 
    } else {
   
        msg = await Supplier.populate(msg, {
            path: 'chat.supplier',
            select: 'name email' 
        })

    }

    await Chat.findByIdAndUpdate(req.body.chatId, {
        latestmsg: msg._id
    })

    res.status(200).json(msg)
})

module.exports.allMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({ chat: req.params.chatId }).populate('chat')

    res.status(200).json(messages)    
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
})

//@desc Send images & videos
//@route POST /sendfiles
//@access Private
module.exports.sendFiles = asyncHandler(async (req, res) => {
    return res.status(200).json({url: req.file.path}) 
}) 

