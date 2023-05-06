const jwt = require("jsonwebtoken");



const authentication = async (req,res,next)=>{
    try {
        let token = req?.headers?.authorization;

        if(!token){
            return res.status(400).json({"msg":"User not authorised"});
        }

        token = req.headers.authorization;

        const isValid = await jwt.verify(token,"avinashkey");

        if(!isValid){
            return res.status(401).json({"msg":"User not authorised"})
        }

        req.body._id = isValid._id;
        next();
    } catch (error) {
        res.status(401).json({"msg":error.message})
    }
}


module.exports = authentication;