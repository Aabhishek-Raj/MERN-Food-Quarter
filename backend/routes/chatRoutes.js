const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatController')
const { protect, combinedMiddleware } = require('../middleware/authMiddleware')

router.route('/').post(protect, chatController.createChat) 
router.route('/').get(combinedMiddleware, chatController.fetchChats)  
router.route('/replay').post(combinedMiddleware, chatController.accessChat)  

router.route('/message').post(combinedMiddleware, chatController.sendMessage)
router.route('/message/:chatId').get(combinedMiddleware, chatController.allMessages)

router.route('/usersearch').get(chatController.userSearch)  


module.exports = router
 