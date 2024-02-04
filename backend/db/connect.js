const mongoose = require("mongoose");
const { mongo_uri } = require("../utils/config");



const connectDB = () => {
    mongoose.connect(mongo_uri).then(() => {
        console.log("Database Connected Successful");
    }).catch((e) => {
        console.log("Error in connecting to DB");
        console.log(e);
    })
}

module.exports = connectDB;