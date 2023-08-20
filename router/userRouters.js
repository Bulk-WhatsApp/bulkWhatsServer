const express  = require("express");
const { signInReq, signIn } = require("../controller/userController");
//const {  signInReq, signIn } = require("../controller/userController");

const userRouter = express.Router();



userRouter.post("/signinReq", signInReq)
userRouter.post("/signIn", signIn)


module.exports = userRouter