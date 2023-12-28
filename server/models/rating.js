const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    ratings: {
        required: true, type: Number
    },
    food_id: {
        required: true, type: String
    },
    userId: {
        required: true, type: String
    },
})
module.exports = mongoose.model('rating', dataSchema)