const express = require("express")
const jwt = require("jsonwebtoken")
const Users = require("../models/userSchema")

const Signup = async (req, res, next) => {
    // console.log(req.body)
    try {
        const { name, email, password } = req.body
        const user = await Users.findOne({ email })
        if (user) {
            res.status(201).json({ message: "User already registered", status: false })
        }
        else {
            const newUser = new Users({
                name: name,
                email: email,
                password: password
            })
            if (newUser) {
                await newUser.save()
                let token;
                try {
                    token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
                        expiresIn: "7d"
                    })
                } catch (error) {
                    new Error("Error! Something went wrong token is not created.");
                    return next(error);
                }
                res.status(201).json({
                    status: true,
                    message: newUser,
                    token: token
                })
            } else {
                res.status(400).json({ error: "Invalid user data" })
            }
        }
    } catch (err) {
        console.log("Error in Signup", err)
        res.status(500).json(err)

    }
}

const login = async (req, res, next) => {

    const { email, password } = req.body;
    const user = await Users.findOne({ email: email })

    if (!user || user.password != password) {
        res.json({
            status: false,
            message: "Wrong details please check at once"
        })
    }
    else {
        let token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.json({
            token: token,
            status: true,
            user: user,
            message: "Login successfully !!"
        })

    }
}
module.exports = { login, Signup }