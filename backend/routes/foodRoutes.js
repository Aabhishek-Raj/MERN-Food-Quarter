const express = require('express')
const router = express.Router()
const foodController = require('../controllers/foodController')
const { supplierProtect, protect } = require('../middleware/authMiddleware')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
 
router.get('/supplierfood', protect, foodController.getSupplierFoods)
router.get('/foodsearch', foodController.foodSearch)

router.use(supplierProtect)
router.post('/create', upload.single('image'), foodController.createFood)
router.get('/getfoods', foodController.getFoods)
router.post('/additem', upload.single('foodpic'), foodController.addItems)
router.delete('/deleteitem', foodController.deleteItems)




module.exports = router