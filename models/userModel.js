const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean

}) 
   

let UserModel = new mongoose.model("user",UserSchema);

module.exports = UserModel;