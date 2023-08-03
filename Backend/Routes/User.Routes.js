const express = require("express")
const userRouter = express.Router()

const { Register, Login } = require("../Controller/User.Contoller");

userRouter.post("/register", Register)

userRouter.post("/login", Login);


module.exports = { userRouter }
