const express = require('express')
const { getFilesStream } = require('../s3')
const router = express.Router()

router.get('/:key', (req, res) => {
    console.log('first')
    console.log(req.params)
    const key = req.params.key
    console.log(key)

    const readStream = getFilesStream(key)

    readStream.pipe(res)
})

module.exports = router