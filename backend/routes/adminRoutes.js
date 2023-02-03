const express = require('express')  
const router = express.Router()
const adminController = require('../controllers/adminController')
const { adminProtect } = require('../middleware/authMiddleware')

// router.get('/', adminController.adminSignUp)
router.post('/signin', adminController.adminSignIn )
router.get('/allusers',adminProtect, adminController.getAllUsers)
router.get('/allsuppliers', adminProtect, adminController.getVerifiedSuppliers)
router.get('/notverified', adminProtect, adminController.getSupplierRequest)
router.post('/blockuser', adminProtect, adminController.blockUser)
router.patch('/verify', adminProtect, adminController.verifySupplier)


module.exports = router