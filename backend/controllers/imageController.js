const express = require('express')
const { adminProtect } = require('../middleware/authMiddleware')
const { getFilesStream } = require('../s3')
const router = express.Router()

router.get('/:key', (req, res) => {

    const key = req.params.key

    const readStream = getFilesStream(key)

    readStream.pipe(res)
})

module.exports = router