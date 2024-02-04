const z = require("zod");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { jwtSign } = require("../utils");
const mongoose = require("mongoose");
const accountModel = require("../models/bankModel");
//signup user
const register = async (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    const registerObject = z.object({
        username: z.string().min(3).max(30).email(),
        password: z.string().min(6),
        firstName: z.string().max(50),
        lastName: z.string().max(50),
    })
    const checkResponse = registerObject.safeParse(req.body);
    if (checkResponse.success == false) {
        return res.status(400).json({ message: "Invalid Inputs", error: checkResponse.error.issues });
    }

    try {
        const findUser = await userModel.findOne({ username: username });
        if (findUser) {
            return res.status(400).json({ message: "User already exists. Sign in to continue" })
        }
        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
        const newUser = new userModel({
            username,
            firstName,
            lastName,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        await accountModel.create({
            userId: savedUser._id,
            balance: 1 + Math.random() * 10000
        })
        const token = jwtSign({ id: savedUser._id });
        return res.status(200).json({ message: "User created successfully", token: token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in user signup" });
    }

}


//sign in user

const login = async (req, res) => {
    const { username, password } = req.body;
    const registerObject = z.object({
        username: z.string().min(3).max(30).email(),
        password: z.string().min(6)
    })
    const checkResponse = registerObject.safeParse(req.body);
    if (checkResponse.success == false) {
        return res.status(400).json({ message: "Invalid Inputs" });
    }

    try {
        const findUser = await userModel.findOne({ username: username });
        if (!findUser) {
            return res.status(400).json({ message: "user does not exists sign up" })
        }
        const checkPassword = await bcrypt.compare(password, findUser.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        const token = jwtSign({ id: findUser._id });
        return res.status(200).json({ message: "User login successfully", token: token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in user signup" });
    }

}
//user profile=
const userProfile = async (req, res) => {
    const id = req.userId;
    try {
        const findUser = await userModel.findById({ _id: id }).select('username firstName lastName');
        return res.status(200).json({ message: "Fetched user successfully", user:findUser })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error In fetching the user" })
    }
}
//edit user
const editUser = async (req, res) => {
    const id = req.userId;
    const updateObject = z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
    })
    const { success } = updateObject.safeParse(req.body)
    if (!success) return res.status(401).json({ message: "Invalid inputs" });
    try {

        const findUser = await userModel.findById({ _id: id });
        if (!findUser) return res.status(404).json({ message: "Failed to find user" });
       const updatedUser= await userModel.findByIdAndUpdate({
            _id: id
        }, req.body,{new:true})
        res.status(200).json({ message: "Updated the user successfully", findUser:updatedUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Occured" });
    }
}

//filter user
const searchUser = async (req, res) => {
    const filter = req.query.filter || "";
    const id = req.userId;
    try {
        const users = await userModel.find({
            $and: [
                {
                    $or: [
                        { firstName: { "$regex": filter, "$options": "i" } },
                        { lastName: { "$regex": filter, "$options": "i" } }
                    ]
                },
                { _id: { $ne: new mongoose.Types.ObjectId(id) } }
            ]

        })

        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error Occured" });
    }
}
module.exports = { register, login, editUser, searchUser, userProfile }