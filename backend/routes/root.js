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

router.get('/blocked', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "blocked.html"))
})

router.get('/file/:uploads/:filename', (req, res) => {

    const { filename } = req.params;

    const filePath = path.join(__dirname,'..', 'uploads', filename);  

    res.sendFile(filePath);

  }); 


module.exports = router