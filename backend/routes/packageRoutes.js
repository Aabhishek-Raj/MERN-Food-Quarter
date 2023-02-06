const express = require('express')
const router = express.Router()
const packageController = require('../controllers/packageController')
const { supplierProtect, protect } = require('../middleware/authMiddleware')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
 
router.post('/create', supplierProtect, upload.single('image'), packageController.createPackage)
router.get('/getpacks', supplierProtect, packageController.getPackages)
router.post('/additem', supplierProtect,upload.single('foodpic'), packageController.addItems)
router.get('/getall', protect, packageController.getAllPackages)



module.exports = router