const {Router} = require("express");
const BookModel = require("../models/bookModel");
const authentication = require("../middlewares/authentication");



const bookRouter = Router();

bookRouter.get("/books", async(req,res)=>{
    try {
        const payload = req.body;
        const bookData = await BookModel.find();
        if(bookData){

            res.status(200).json({"Available books":bookData})
        }
        else{
            res.status(400).json({"msg":"No data found"})
        }
        
    } catch (error) {
        res.status(401).json({"error":error.message});
    }
})

bookRouter.get("/books/:id",async(req,res)=>{
    try {
        const bookData = await BookModel.findById({_id:req.params.id});
        if(bookData){

            res.status(200).json({"Here is your book":bookData})
        }
        else{
            res.status(400).json({"msg":"No data found"})
        }
        
    } catch (error) {
        res.status(401).json({"error":error.message});
    }
})

bookRouter.use(authentication);

bookRouter.post("/books",async(req,res)=>{
    try {
        const postData = BookModel(req.body);
        await postData.save();
        res.status(200).json({"msg":"Posted successfully"})
        
    } catch (error) {
        res.status(401).json({"error":error.message})
    }
})


bookRouter.patch("/books/:id",async(req,res)=>{
    try {
        const postData = await BookModel.findByIdAndUpdate((_id=req.params.id),req.body);
        await postData.save();
        res.status(200).json({"msg":"Data updated successfully"});
        
    } catch (error) {
        res.status(401).json({"error":error.message})
    }
})

bookRouter.delete("/books/:id",async(req,res)=>{
    try {
         await BookModel.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({"msg":"Data deleted successfully"});
        
    } catch (error) {
        res.status(401).json({"error":error.message})
    }
})

module.exports = bookRouter;