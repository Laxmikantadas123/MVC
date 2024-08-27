const Models = require("../models/user")
const jwt=require("jsonwebtoken")

async function handelPostAllUser(req, res) {
    const data = new Models(req.body)
    try {
       await data.save()
        res.status(201).send(data)
    } catch (e) {
        res.status(400).send(e)
    }

}


async function handelGetAllUser(req, res) {
       try{
        const data= await Models.find({})
        res.status(200).send(data)
       }catch(e){
        res.status(400).send(e)
       }

}
async function handelByIdUser(req,res) {
    const _id=req.params.id
    try{
        const data=await Models.findById(_id)
        res.status(200).send(data)
    }catch(e){
        res.status(400).send(e)
    }
    
}
async function handelUpdateUser(req,res) {
    
    const updates=Object.keys(req.body)
    const allowdUpdate=["name","age","email","phone","password"]
    const isValidUpadte=updates.every((update)=>allowdUpdate.includes(update))
    if(!isValidUpadte){
        res.status(400).send({error:"Invalid update"})
    }
    try{
        // const user=await Models.findById(req.params.id)
        // updates.forEach((update)=>user[update]==req.body[update])
        // await user.save()
        const data=await Models.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).send(data)
    }catch(e){
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
}
async function handelDeleteUser(req,res) {
    const _id=req.params.id
    try{
        const data=await Models.findByIdAndDelete(_id)
        res.status(200).send(data)
    }catch(e){
        res.status(400).send(e)
    }
    
}
// ---------------------login---------------
async function handelTologin(req,res) {
    const { email, password } = req.body;
    try{
        const user=await Models.findByCredentials(email,password)
        const token=await user.generateAuthToken()
           res.send({user,token})
           console.log({user,token});
        
        
           
    }catch(e){
        res.status(400).send()
    }
}


module.exports = {
    handelPostAllUser,
    handelGetAllUser,
    handelByIdUser,
    handelUpdateUser,
    handelDeleteUser,
    handelTologin

}