const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pin:{
        type: Number,
        required: true,
        default:0
    },
    isPinSet:{
        type:Boolean,
        required:true,
        default:false
    },
    balance: {
        type: Number,
        required: true
    }
});

const accountModel = mongoose.model('Account', accountSchema);

module.exports = accountModel