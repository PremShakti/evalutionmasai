
const jwt=require("jsonwebtoken")
require('dotenv').config()
const auth=(req,res,next)=>{

    const token=req.headers.authorization?.split(" ")[1]
    
    if(token){
        try {
            const oktoken=jwt.verify(token,process.env.JWTSECRET)

            if(oktoken){
               
                req.body.userID=oktoken.userID
                next()
            }else{
                res.json({message:"wrong token"})
            }

        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }else{
        res.status(400).json({message:"please pass the token"})
    }


}

module.exports={
    auth
}