const express = require('express')  
const router = express.Router()
const adminController = require('../controllers/adminController')
const { adminProtect } = require('../middleware/authMiddleware')

// router.get('/', adminController.adminSignUp)
router.post('/signin', adminController.adminSignIn )

router.use(adminProtect)
router.get('/allusers', adminController.getAllUsers)
router.get('/allsuppliers', adminController.getVerifiedSuppliers)
router.get('/notverified', adminController.getSupplierRequest)
router.patch('/blockuser', adminController.blockUser) 
router.patch('/unblockuser', adminController.unBlockUser)
router.patch('/verify', adminController.verifySupplier)
router.patch('/blocksupplier', adminController.blockSupplier)
router.patch('/unblocksupplier', adminController.unBlockSupplier)


module.exports = router