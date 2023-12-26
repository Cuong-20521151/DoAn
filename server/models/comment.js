const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    cmt: {
        required: true, type: String
    },
    food_id: {
        required: true, type: String
    },
    userId: {
        required: true, type: String
    },
})
module.exports = mongoose.model('comment', dataSchema)