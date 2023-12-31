const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    
    user_flow: {
        required: true, type: String
    },
    userId: {
        required: true, type: String
    },
})
module.exports = mongoose.model('flow', dataSchema)