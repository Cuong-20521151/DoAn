const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    email:{
        type: String
    },
    username:{
        required: true, type: String
    },
    password:{
        required: true, type: String
    },
    name:{
        firstname:{
            type: String
        },
        lastname:{
            type: String
        }
    },
    address:{
        type: String
    },
    phone:{
        type: Number
    },
    userImage:{
        type: String
    },
})
module.exports = mongoose.model('user', dataSchema)