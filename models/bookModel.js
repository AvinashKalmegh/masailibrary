const mongoose = require("mongoose");

let BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number

}) 
   

let BookModel = new mongoose.model("book",BookSchema);

module.exports = BookModel;