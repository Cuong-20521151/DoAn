<<<<<<< HEAD
const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    
    user_flow: {
        required: true, type: String
    },
    userId: {
        required: true, type: String
    },
})
=======
const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    
    user_flow: {
        required: true, type: String
    },
    userId: {
        required: true, type: String
    },
})
>>>>>>> 8d2b362f2620f144394301968dda8293a456c011
module.exports = mongoose.model('flow', dataSchema)