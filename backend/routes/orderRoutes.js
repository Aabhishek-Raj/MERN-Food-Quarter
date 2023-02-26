const express = require('express')
const orderController = require('../controllers/orderController')
const { protect, supplierProtect } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/address', protect, orderController.addAddress)
router.get('/getaddresses', protect, orderController.getAddress)
router.patch('/editaddress', protect, orderController.editTheAddress)

router.post('/order', protect, orderController.razorpayPayment)
router.post('/verify', protect, orderController.paymentVerify)

router.get('/getorders',supplierProtect, orderController.getAllOrders)
router.get('/allorders', protect, orderController.getOrderHistory)
router.get('/orderget', supplierProtect, orderController.getOrder) 
router.get('/getdeliveryaddress', supplierProtect, orderController.getDeliveryAddress)

module.exports = router