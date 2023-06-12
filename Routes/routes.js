const express=require('express')
const {UsersModel,PostModel}=require('../userModel/Usermodel.js')
const Routes=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()


Routes.post('/register ',async(req,res)=>{
    const {name, email,password,gender,age,city,is_married}=req.body
    try {
        let existUser= await UsersModel.findOne({email})
        if(existUser){
            res.status(400).json({message:"User already exist, please login."})
        }else{
let hashpass=await bcrypt.hash(password,5)

const newuser=new UsersModel({
    name,email,gender,password:hashpass,age,city,is_married,
})

await newuser.save()

res.status(200).json({message:"user registred successfully."})

        }


    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

Routes.post("/login",async(req,res)=>{

const {email,password}=req.body

    try {
        const user=await UsersModel.findOne({email})
        if(!user){
            res.status(400).json({message:"Invalid credentials"})

        }

        const pass=await bcrypt.compare(password,user.password)
        if(!pass){
            res.status(400).json({message:"Invalid credentials"})
        }

        const token= jwt.sign({userId:user._id},process.env.JWTSECRET)
        res.status(200).json({message:"login success",token:token})

    } catch (error) {
        res.status(400).json({message:error.message})
    }
})



module.exports={
    Routes
}