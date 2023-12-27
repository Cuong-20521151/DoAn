const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    
    food_id: {
        required: true, type: String
    },
    userId: {
        required: true, type: String
    },
})
module.exports = mongoose.model('save', dataSchema)