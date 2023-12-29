const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    email:{
        required: true, type: String
    },
    username:{
        required: true, type: String
    },
    password:{
        required: true, type: String
    },
    name:{
        firstname:{
            required: true, type: String
        },
        lastname:{
            required: true, type: String
        }
    },
    address:{
        required: true, type: String
    },
    phone:{
        required: true, type: Number
    },
    userImage:{
        required: true, type: String
    },
})
module.exports = mongoose.model('user', dataSchema)