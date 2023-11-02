const User=require('../models/user')
exports.signup=(req,res)=>{
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
exports.login=(req,res)=>{
  console.log("logging in") 
  const{email,password}=req.body
  User.findAll({where:{email}})
.then((user)=>{
 // console.log(user)
  console.log(user[0].password)

  if(user.length>0){
    if(user[0].password===password){
      res.status(200).json({success:true,message:"User logged in successfully"})
    }
    else{
      return res.status(400).json({success:false,message:"Password is incorrect"})
    }
  }else{
    return res.status(404).json({success:false,message:"User doesnot exist"})
  }
})
.catch(err=>{
  console.log("this is error",err)
  res.status(500).json({success:false,message:err})
})
}
