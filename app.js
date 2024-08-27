const express=require("express")
const mongoose=require("mongoose")
// const hbs=require("hbs")
// const path=require("path")
const userRouter=require("./routes/userRoutes")

// --------------- mongoose connection-----------
mongoose.connect("mongodb://localhost:27017/userDetails")
.then(()=>{console.log("database is connected")})
.catch(()=>{console.log("database is not connected");})

// --------------------------------------------------
const app=express()
app.use(express.json())

// app.use("view engine","hbs")
// app.set('views', path.join(__dirname, 'views'));
app.use("/users",userRouter)

app.listen(3000,()=>{
    console.log("server is running in 3000 port");
    
})



