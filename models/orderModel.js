const mongoose = require("mongoose");

let OrderSchema = new mongoose.Schema({
    user : { type: String, ref: 'User' },
	 books : [{ type: String, ref: 'Book' }],
	 totalAmount: Number

}) 
   

let OrderModel = new mongoose.model("order",OrderSchema);

module.exports = OrderModel;