require('dotenv').config()
const AWS = require('aws-sdk')
const fs = require('node:fs')
const util = require('node:util')
const unlinkFile = util.promisify(fs.unlink)

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey
})

// Uploads a file to s3
async function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    const result = await s3.upload(uploadParams).promise()
    await unlinkFile(file.path)
    return result
}

exports.uploadFile = uploadFile

//Downloads a file from s3
function getFilesStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream()
}
exports.getFilesStream = getFilesStream

