const mongoose = require("mongoose");

const transactionSchema =new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const transactionModel = mongoose.model("Trasactions", transactionSchema);
module.exports = transactionModel;