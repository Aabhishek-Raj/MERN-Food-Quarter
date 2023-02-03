const express = require('express')
const router = express.Router()
const packageController = require('../controllers/packageController')
const { supplierProtect, protect } = require('../middleware/authMiddleware')
 
router.post('/create', supplierProtect, packageController.createPackage)
router.get('/getpacks', supplierProtect, packageController.getPackages)
router.post('/additem', supplierProtect, packageController.addItems)
router.get('/getall', protect, packageController.getAllPackages)



module.exports = router