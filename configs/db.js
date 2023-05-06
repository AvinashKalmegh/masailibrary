const mongoose = require("mongoose");

const main = async()=>{
    
    let connect = await mongoose.connect("mongodb+srv://avinash:avinash@cluster0.vhz5xmy.mongodb.net/library?retryWrites=true&w=majority");
    console.log("connected to db");
}

module.exports = main;