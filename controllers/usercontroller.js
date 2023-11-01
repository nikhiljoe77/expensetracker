const User=require('../models/user')
exports.add=(req,res)=>{
    console.log("adding") 
    User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
})
.then((result)=>{
res.status(201).json({message:"Successfully created new user"})
})
.catch(err=>{
    console.log("this is error",err)
  res.status(500).json(err)
})
}
