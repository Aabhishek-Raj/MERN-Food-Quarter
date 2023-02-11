const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, chatController.accessChat)
router.route('/').get(protect, chatController.fetchChats)

router.route('/message').post(protect, chatController.sendMessage)
router.route('/message/:chatId').get(protect, chatController.allMessages)

router.route('/usersearch').get(chatController.userSearch)


module.exports = router
