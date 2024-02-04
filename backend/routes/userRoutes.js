const { register, login, editUser, searchUser, userProfile } = require("../controller/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();



router.post("/register", register);
router.post('/login', login);
router.put("/updateuser", authMiddleware, editUser);
router.get("/search",authMiddleware, searchUser);
router.get("/profile",authMiddleware, userProfile);

module.exports = router;