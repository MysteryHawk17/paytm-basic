const jwt = require("jsonwebtoken")
const { jwtSecret } = require("./config")
//sign jwt
const jwtSign = (payload) => {
    const sign = jwt.sign(payload, jwtSecret);
    return sign;
}

//verify jwt
const verifyJwt = (token) => {
    try {
        const response = jwt.verify(token, jwtSecret)
        return { data: response, status: true }
    } catch (error) {
        console.log(error);
        return { error: error, status: false }
    }

}


//decode jwt



module.exports = { jwtSign, verifyJwt }