const {Router} = require("express");
const OrderModel = require("../models/orderModel");
const authentication = require("../middlewares/authentication");

const orderRouter = Router();


orderRouter.use(authentication);


orderRouter.get("/orders", async(req,res)=>{
    try {
        const orderData = await OrderModel.find();
        if(orderData){

            res.status(200).json({"Available orders":orderData})
        }
        else{
            res.status(400).json({"msg":"No data found"})
        }
        
    } catch (error) {
        res.status(401).json({"error":error.message});
    }
})

orderRouter.post("/order",async(req,res)=>{
    try {
        const postData = OrderModel(req.body);
        await postData.save();
        res.status(200).json({"msg":"Ordered successfully"})
        
    } catch (error) {
        res.status(401).json({"error":error.message})
    }
})

module.exports = orderRouter;