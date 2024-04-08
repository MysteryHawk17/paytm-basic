const { transferFunds, getUserBalance, getHistory, getTrasaction, addMoney, getDiffTrasaction } = require("../controller/accountController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.put('/transfer', authMiddleware, transferFunds);
router.put("/addmoney", authMiddleware, addMoney);
router.get('/getbalance', authMiddleware, getUserBalance);
router.get("/transactionhistory", authMiddleware, getHistory);
router.get("/trasaction/:id",authMiddleware, getTrasaction);
router.get("/difftransaction",authMiddleware,getDiffTrasaction);
//get trasaction history by spent and received 


module.exports = router;