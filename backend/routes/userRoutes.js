//import express from "express";
const express = require('express');
const { authorization } = require("../middlewares/auth");
const {
  loginUser,
  logoutUser,
  registerUser,
  deleteUser,
} = require("../controllers/userController");
const {
  loginUserRules,
  userValidation,
  registerUserRules,
} = require("../validation/userValiadation");

const userEntity = require("../models/userEntity"); 
// const { deleteUserService } = require('../services/userServices');
const userRouter = express.Router();

userRouter
   .route("/register")
   .post(registerUserRules(), userValidation, registerUser);
userRouter.route("/deleteUser/:id").put(loginUserRules(), userValidation) .delete(deleteUser);
userRouter.route("/login").post(loginUserRules(), userValidation, loginUser);
userRouter.route("/logout").get(authorization, logoutUser);

module.exports =  userRouter;