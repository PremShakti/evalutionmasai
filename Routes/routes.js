const express=require('express')
const {UsersModel}=require("../userModel/Usermodel")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const Routes=express.Router()


Routes.post('/register',async(req,res)=>{
    console.log(req.body)
    const {name, email,password,gender,age,city,is_married}=req.body
    try {
        let existUser= await UsersModel.findOne({email})
        if(existUser){
            res.status(400).json({message:"User already exist, please login."})
        }else{
let hashpass=await bcrypt.hash(password,5)

const newuser=new UsersModel({
    name:name,
    email:email,
    gender:gender,
    password:hashpass,
    age:age,
    city:city,
    is_married:is_married
})

await newuser.save()

 return res.status(200).json({message:"user registred successfully."})

        }


    } catch (error) {
       return res.status(400).json({message:error.message})
    }
})

Routes.post("/login",async(req,res)=>{


    try {
        const { email, password } = req.body
   

        let User = await UsersModel.findOne({ email })
        
        if (!User) {
            res.status(400).json({ message: 'user is not exist' })
        } else {
              bcrypt.compare(password, User.password,(err,result)=>{
                if (err) {
                    res.status(400).json({ message: 'password is incorect' })
                } else {
                    let token = jwt.sign({ userID:User._id }, process.env.JWTSECRET)
                    res.status(200).json({ message: 'Login successfull', token: token })
                }
            })
          
        }

    } catch (error) {
        res.status(400).json({message:error.message})
    }
})








module.exports={
    Routes
}