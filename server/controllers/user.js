const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const config = require("../config/config")


const createUser = async (req, res) => {
    try {
        const {password, email, name} = req.body.user;
        console.log(req.body)


        console.log(password, email, name)

        const emailValid = await User.findOne({email}).exec();

        if (emailValid) {
            res.status(400).json({message: "Email already exist"});
            return false;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({email: result.email, id: result._id}, config.AUTH, {
            expiresIn: config.expiresIn
        });

        res.status(200).json({user: result, token});
    } catch (error) {
        console.log(error);
        res.status(409).json({message: error.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const {userId: _id} = req.params;
        const user = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(400).send("The user id is inValid.");

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {...user, _id},
            {new: true}
        );

        res.status(200).json({user: updatedUser});
    } catch (error) {
        console.error(error);
        res
            .status(404)
            .json({message: "The user with the given id was not found."});
    }
};

const getSingleUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findById({_id: userId}).exec();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
        console.error(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email}).exec();
        if (!user) return res.status(400).json({message: "User doesn't exist"});
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect)
            return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign(
            {email: user.email, id: user._id, name: user.name},
            config.AUTH,
            {
                expiresIn: config.expiresIn,
            }
        );

        res.status(200).json({user, token});
    } catch (error) {
        res.status(500).json({details: "Something went wrong"});
        console.error(error);
    }
};

const verifyUser = async (req, res) => {
    const {email, password, username} = req.body;
    try {
        const user = await User.findOne({username}).exec();
        const ifEmail = await User.findOne({email}).exec();
        if (ifEmail || user) {
            res.status(400).json({message: "Username or Email already exist"});
            return false;
        }
        /*
            if (password !== passwordConfirm) {
              res.status(400).json({ message: "Password not matches." });
              return false;
            }*/
        return true;
    } catch (error) {
        console.error(error);
    }
};

const logout = async (req, res) => {
    const data = req.body;
    jwt.sign(data.key, "", {expiresIn: 1}, (logout, err) => {
        if (logout) {
            res.send({msg: "You have been Logged Out"});
        } else {
            res.send({msg: "Error"});
        }
    });
};


module.exports = {
    createUser,
    logout,
    verifyUser,
    updateUser,
    getSingleUser,
    loginUser
}
