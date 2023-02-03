const express = require('express')
const router = express.Router()
const path = require('node:path')

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

// verified page route
router.get("/user/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "verified.html"))
})

module.exports = router