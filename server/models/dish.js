const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    foodName: {
        required: true, type: String
    },
    foodPhoto: {
        required: true, type: String
    },
    foodProcessing: {
        required: true, type: String
    },
    foodIngredients: {
        required: true, type: String
    },
    cookingTime: {
        required: true, type: String
    },
    feel: {
        required: true, type: String
    },
    foodRations: {
        required: true, type: String
    },
    mealType: {
        required: true, type: String
    },
    foodProcessingType: {
        required: true, type: String
    },
})
module.exports = mongoose.model('dishs', dataSchema)