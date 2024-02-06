const { transferFunds, getUserBalance, getHistory, getTrasaction } = require("../controller/accountController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.put('/transfer', authMiddleware, transferFunds);
router.get('/getbalance', authMiddleware, getUserBalance);
router.get("/transactionhistory", authMiddleware, getHistory);
router.get("/trasaction/:id",authMiddleware, getTrasaction);
module.exports = router;