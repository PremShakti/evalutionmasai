const mongoose=require('mongoose')


const RegisterSchemaa=mongoose.Schema({
    name:String,
    email : String,
    gender : String,
    password : String,
    age : Number,
    city : String,
    is_married : Boolean
})

const PostSchema=mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_of_comments: Number
})

const UsersModel=mongoose.model("user",RegisterSchemaa)
const PostModel=mongoose.model("post",PostSchema)

module.exports={
    UsersModel,
    PostModel
}


