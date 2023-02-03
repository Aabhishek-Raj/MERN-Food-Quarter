const express = require('express')
const router = express.Router()
const supplierController = require('../controllers/supplierController')

router.get('/')
router.post('/register', supplierController.register)
router.post('/login', supplierController.login)

module.exports = router