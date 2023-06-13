const express=require('express')
const {UsersModel,PostModel}=require("../userModel/Usermodel")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {auth} =require('../middleware/auth')
require('dotenv').config()
const PostRopute=express.Router()

PostRopute.post("/add",auth, async(req,res)=>{
   

    try {
        let newpost= new PostModel(req.body)
            await newpost.save()
           res.status(200).json({message:"post succesfully posted"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


PostRopute.get("/", async(req,res)=>{
const page= parseInt(req.query.page)||1
limit=3
const skip=(page-1)*limit
const device = req.query.device
    try {
        let newpost= await PostModel.find(device).sort().skip(skip).limit(limit)

        res.status(200).json(newpost)

    } catch (error) {
        res.status(400).json({message:error.message})
    }
})



PostRopute.get("/top", async(req,res)=>{
    const page= parseInt(req.query.page)||1
    const device = req.query.device
    limit=3
    const skip=(page-1)*limit
    
        try {
            let newpost= await PostModel.find({device}).sort({no_of_comments:1}).skip(skip).limit(limit)
    
            res.status(200).json(newpost)
    
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    })
    PostRopute.patch("/update/:id",auth, async(req,res)=>{
        
          
           const userId= req.body.userId
        const {id}=req.params
            try {
              
                const post=await PostModel.findOne({_id:id})
                const userid=post.userId
                if(userId===userid){
                    await PostModel.findByIdAndUpdate({_id:id},req.body)
                    res.status(200).json({message:"update success"})
        
                }else{
                    res.status(400).json({message:"Not authorized"})
                }
                
            } catch (error) {
                res.status(400).json({message:error.message})
            }
        })

        PostRopute.delete("/delete/:id",auth, async(req,res)=>{
          console.log(req.body)
            const userId= req.body.userId
         const {id}=req.params
             try {
               
                 const post=await PostModel.findOne({_id:id})
                 const userid=post.userId
                 if(userId===userid){
                     await PostModel.findByIdAndDelete({_id:id},req.body)
                     res.status(200).json({message:"delete success"})
         
                 }else{
                    res.status(400).json({message:"Not authorized"})
                 }
                 
             } catch (error) {
                 res.status(400).json({message:error.message})
             }
            })
            
        
    









module.exports={
    PostRopute
}