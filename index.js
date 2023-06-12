const express=require('express')
require('dotenv').config()
const {Routes}=require('./Routes/routes')
const {connect}=require('./db')
const cors=require('cors')
const { PostRopute } = require('./Routes/routepost')
let app=express()
let PORT=process.env.PORT
app.use(express.json())
app.use(cors())

app.use("/users",Routes)
app.use("/posts",PostRopute)



app.listen(8080, async()=>{
    try {
        await connect
        console.log(`your port is running in ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})