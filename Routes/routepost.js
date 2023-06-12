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


PostRopute.get("/",auth, async(req,res)=>{
const page= parseInt(req.query.page)||1
limit=3
const skip=(page-1)*limit
const device = req.query.device
    try {
        let newpost= await PostModel.find({device}).sort().skip(skip).limit(limit)

        res.status(200).json(newpost)

    } catch (error) {
        res.status(400).json({message:error.message})
    }
})



PostRopute.get("/top",auth, async(req,res)=>{
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
    PostRopute.post("/update",auth, async(req,res)=>{
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

        PostRopute.post("/delete",auth, async(req,res)=>{
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
            
        
    









module.exports={
    PostRopute
}