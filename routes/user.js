const {Router} = require("express");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userRouter = Router();

userRouter.post("/register",async(req,res)=>{
    try {
        let payload = req.body;
        const userData = await UserModel.findOne({email:payload.email});
        if(userData){
            res.send({"msg":"User already exists, please login"});
        }
        else{
            const hashedPassword = await bcrypt.hashSync(payload.password,3);
            console.log(hashedPassword);

            payload.password = hashedPassword;

            const newUser = UserModel(payload);
            await newUser.save();

            res.status(201).json({"msg": "Successfully registered"})
        }
    } catch (error) {
        res.send({"error":error.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    try {
        const payload = req.body;

        const userData = await UserModel.findOne({email:payload.email});

        if(!userData){
            res.send({"msg":"User not registered, please register first"});
        }

        const originalPass = await bcrypt.compareSync(
            payload.password,
            userData.password
        )

        if(originalPass){
            const token = await jwt.sign({email:userData.email, user_id:userData._id},"avinashkey");
            res.status(201).json({"msg": "Login successfull", token})
        }
        else{
            res.status(401).json({"msg":"No user found"});
        }
        
    } catch (error) {
        res.send({"error":error.message});
    }
})

module.exports = userRouter;