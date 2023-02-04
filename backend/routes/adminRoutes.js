const express = require('express')  
const router = express.Router()
const adminController = require('../controllers/adminController')
const { adminProtect } = require('../middleware/authMiddleware')

// router.get('/', adminController.adminSignUp)
router.post('/signin', adminController.adminSignIn )
router.get('/allusers',adminProtect, adminController.getAllUsers)
router.get('/allsuppliers', adminProtect, adminController.getVerifiedSuppliers)
router.get('/notverified', adminProtect, adminController.getSupplierRequest)
router.patch('/blockuser', adminProtect, adminController.blockUser)
router.patch('/unblockuser', adminProtect, adminController.unBlockUser)
router.patch('/verify', adminProtect, adminController.verifySupplier)
router.patch('/blocksupplier', adminProtect, adminController.blockSupplier)
router.patch('/unblocksupplier', adminProtect, adminController.unBlockSupplier)


module.exports = router