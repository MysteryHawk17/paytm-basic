require("dotenv").config();
const jwtSecret = process.env.jwt_secret
const mongo_uri = process.env.MONGO_URI

module.exports = { jwtSecret, mongo_uri }