
const express=require("express")
const path=require("path")
const cors=require("cors")
const userroute=require(`./routes/userroute`)
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')));
app.use('/',userroute)
app.listen(4000,()=>{console.log("server is running")})