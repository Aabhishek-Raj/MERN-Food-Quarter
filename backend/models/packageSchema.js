const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Supplier'
    },
    packagename: {
        type: String,
        required: true
    },      
    variety: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true 
    },
    FoodItems: [
        {
            itemname: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true,
            },
            calory: {
                type: Number,
                required: true,
            },
            foodpic: {
                type: String,
                required: true
            }
        }
    ] 
})

module.exports = mongoose.model('Package', packageSchema)