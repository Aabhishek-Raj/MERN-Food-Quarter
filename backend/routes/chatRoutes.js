const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatController')
const { protect, combinedMiddleware } = require('../middleware/authMiddleware')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.route('/').post(protect, chatController.createChat) 
router.route('/').get(combinedMiddleware, chatController.fetchChats)  
router.route('/replay').post(combinedMiddleware, chatController.accessChat)  

router.route('/message').post(combinedMiddleware, chatController.sendMessage)
router.route('/message/:chatId').get(combinedMiddleware, chatController.allMessages)

router.route('/usersearch').get(chatController.userSearch)  
router.route('/sendfiles').post(combinedMiddleware, upload.single('file'), chatController.sendFiles)


module.exports = router
 