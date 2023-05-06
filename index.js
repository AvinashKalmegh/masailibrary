const express = require("express");
const main = require("./configs/db");
const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");
const orderRouter = require("./routes/order");
const authentication = require("./middlewares/authentication");

const app = express();
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Masai Library");
})

app.use("/users",userRouter);
app.use("/books",bookRouter);
app.use("/orders",orderRouter);
































app.listen(3002,()=>{
    main();
    console.log("connected to 3002")
})