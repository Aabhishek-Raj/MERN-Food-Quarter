const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { protect, checkBlocked } = require('../middleware/authMiddleware')
router.use(checkBlocked)

router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.get('/verify/:userId/:OTP', userController.verifyEmail)
router.post('/resendemail', userController.resendEmail)
router.post('/resetpassword', userController.resetPassword)
router.post('/changepassword', userController.changePassword)
router.get('/allsuppliers',protect , checkBlocked, userController.getAllSuppliers)


module.exports = router      