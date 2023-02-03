const asyncHandler = require('express-async-handler')
const Package = require('../models/packageSchema')

// @desc Create new package
// @route POST /create
// @access Private
module.exports.createPackage = asyncHandler(async (req, res) => {
    const { packagename, variety, image, FootItems } = req.body

    if (!packagename || !variety || !image) {
        return res.status(400).json({ message: 'All Fields are required' })
    }

    const duplicate = await Package.findOne({ packagename }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: "Package with same name exist" })
    }

    const package = await Package.create({ supplierId: req.supplier.supplierId, packagename, variety, image })

    if (package) {
        res.status(200).json(package)
    } else {
        res.status(400).json({ message: "Invalid details" })
    }
})

// @desc To get packages
// @route POST /getpacks
// @access Private
module.exports.getPackages = asyncHandler( async (req, res) => {

    const packages = await Package.find({supplierId: req.supplier.supplierId}).lean()

    if(!packages?.length){
        return res.status(400).json({message: 'No users Found'})
    }
    
    res.status(200).json(packages)
})

// @desc Add items to package
// @route POST /additem
// @access Private
module.exports.addItems = asyncHandler( async (req, res) => {
    const { itemname, amount, foodpic, calory, id } = req.body

    if(!itemname || !amount || !foodpic || !calory || !id){
        return res.status(400).json({message: 'All fiels are Required'})
    }

    const package = await Package.findById(id)

    if(!package){
        return res.status(400).json({message: "First Create a package to add items"})
    }

    if(!req.supplier.supplierId){
        return res.status(401).json({message: "You are not authorized to add Items"})
    }

    //To make sure the the package is owned by the supplier
    if(package.supplierId.toString() !== req.supplier.supplierId){
        return res.status(401).json({message: 'Not authorized to edit this package'})
    }

    const insertItem = await Package.findOneAndUpdate({_id: id}, {$push: {FoodItems: req.body}}, {new: true} )

    res.status(200).json(insertItem)
})


// @desc Get all packages for user
// @route POST /getall
// @access Private
module.exports.getAllPackages = asyncHandler( async (req, res) => {

    const packages = await Package.find().lean().exec()

    if(!packages?.length){
        return res.status(400).json({message: "No packages available"})
    }
    
    res.status(200).json(packages)

})
