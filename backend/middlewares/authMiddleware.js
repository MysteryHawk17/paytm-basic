const { verifyJwt } = require("../utils");


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("1");
        return res.status(403).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyJwt(token);
        req.userId = decoded.data.id;

        next();
    } catch (err) {
        console.log(err);
        console.log("2");
        return res.status(403).json({ message: "Unauthorized" });
    }
};

module.exports = {
    authMiddleware
}