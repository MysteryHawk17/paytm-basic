const accountModel = require("../models/bankModel");
const mongoose = require("mongoose");
const transactionModel = require("../models/transactionModel");

const transferFunds = async (req, res) => {
    const session = await mongoose.startSession();
    const { amount, to } = req.body;
    try {
        session.startTransaction();

        const account = await accountModel.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
        if (amount == 0) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid amount transfer"
            });
        }
        const toAccount = await accountModel.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        await accountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await accountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
        const trasactionHistory = await transactionModel.create({ senderId: req.userId, receiverId: to, amount: amount })
        await session.commitTransaction();
        res.status(200).json({
            message: "Transfer successful",
            info: trasactionHistory
        });
    } catch (error) {

        await session.abortTransaction();
        console.error("Transaction aborted due to error:", error);
        res.status(500).json({
            message: "An error occurred during transaction"
        });
    } finally {

        session.endSession();
    }

}

const addMoney=async(req,res)=>{
    const session = await mongoose.startSession();
    const {amount}=req.body;
    try {
        session.startTransaction();
        const account = await accountModel.findOne({ userId: req.userId }).session(session);
        if (!account) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }
        if (amount == 0) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid amount transfer"
            });
        }
        await accountModel.updateOne({ userId: req.userId }, { $inc: { balance: amount } }).session(session);
        const trasactionHistory = await transactionModel.create({ senderId: req.userId, receiverId: req.userId, amount: amount })
        await session.commitTransaction();
        res.status(200).json({
            message: "Money added successfully",
            info: trasactionHistory
        });
    } catch (error) {

        await session.abortTransaction();
        console.error("Transaction aborted due to error:", error);
        res.status(500).json({
            message: "An error occurred during transaction"
        });
    } finally {

        session.endSession();
    }
}

//get user balance
const getUserBalance = async (req, res) => {
    const id = req.userId;
    try {
        const findBalance = await accountModel.findOne({ userId: id }).populate("userId", "-_id -password");
        if (!findBalance) {
            return res.status(400).json({ message: "Failed to fetch the balance" });
        }
        res.status(200).json({ message: "Account balance fetched successfully", info: findBalance })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error occured" });
    }
}

//get trasaction history
const getHistory = async (req, res) => {
    const userId = req.userId;
    try {

        const findTrasactions = await transactionModel.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        }).populate("senderId").populate("receiverId").sort({ createdAt: -1 })
        res.status(200).json({ message: "Trasactions fetched successfully", findTrasactions })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Occured" })
    }
}

const getTrasaction = async (req, res) => {
    const userId = req.userId;
    const id = req.params.id;
    if (id == ":id") {
        return res.status(400).json({ message: "Invalid parameter" })
    }
    try {
        const findTrasaction = await transactionModel.findOne({ _id: id,$or:[{senderId:userId},{receiverId:userId}] }).populate("senderId").populate("receiverId");
        const utcDate = new Date(findTrasaction.createdAt);

        // Get local time in ISO format
        const localTimeString = utcDate.toLocaleString();

        console.log(localTimeString);
        const info = { receiver: findTrasaction.receiverId.username, amount: findTrasaction.amount, time: localTimeString }
        return res.status(200).json({ message: "Successful", info: info });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in fetching tra" })
    }
}
const getDiffTrasaction = async (req, res) => {
    const userId=req.userId;
    try{
        let sentTransactions = await transactionModel.find({ senderId: userId, receiverId: { $ne: userId } });
        let receivedTransactions = await transactionModel.find({ receiverId: userId, senderId: { $ne: userId } });
        const moneyAddedTransactions = await transactionModel.find({ senderId: userId, receiverId: userId });
        sentTransactions=sentTransactions.filter(trasaction=>trasaction.senderId!==trasaction.receiverId);
        receivedTransactions=receivedTransactions.filter(trasaction=>trasaction.senderId!==trasaction.receiverId);
        console.log(sentTransactions);
        console.log("---------------------");
        console.log(receivedTransactions);
        const spentAmount=sentTransactions.reduce((acc,curr)=>acc+curr.amount,0);
        const receivedAmount=receivedTransactions.reduce((acc,curr)=>acc+curr.amount,0);
        const moneyAddedAmount=moneyAddedTransactions.reduce((acc,curr)=>acc+curr.amount,0);
        const info={spent:spentAmount,received:receivedAmount,moneyAdded:moneyAddedAmount}
        res.status(200).json({message:"Successful",info:info});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Error in fetching tra"})
    }
}
module.exports = { transferFunds, getUserBalance, getHistory, getTrasaction ,addMoney,getDiffTrasaction};