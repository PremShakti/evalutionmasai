const express=require('express')
require('dotenv').config()
const {Routes}=require('./Routes/routes')
let app=express()
let PORT=process.env.PORT
app.use(express.json())

app.use("user",Routes)



app.listen(8080,()=>{
    try {
        console.log(`your port is running in ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})