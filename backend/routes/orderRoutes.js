const express = require('express')
const orderController = require('../controllers/orderController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/address', protect, orderController.addAddress)
router.get('/getaddresses', protect, orderController.getAddress)

router.post('/order', protect, orderController.razorpayPayment)
router.post('/verify', protect, orderController.paymentVerify)

module.exports = router