const express = require('express')
const router = express.Router()
const foodController = require('../controllers/foodController')
const { supplierProtect, protect } = require('../middleware/authMiddleware')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
 
router.post('/create', supplierProtect, upload.single('image'), foodController.createFood)
router.get('/getfoods', supplierProtect, foodController.getFoods)
router.post('/additem', supplierProtect,upload.single('foodpic'), foodController.addItems)
router.get('/supplierfood', protect, foodController.getSupplierFoods)



module.exports = router