const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.get('/verify/:userId/:OTP', userController.verifyEmail)
router.post('/resendemail', userController.resendEmail)
router.post('/resetpassword', userController.resetPassword)
router.post('/changepassword', userController.changePassword)
router.get('/allsuppliers', protect, userController.getAllSuppliers)


module.exports = router      