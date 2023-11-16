const Expenseuser=require('../models/expensemodels')
const path=require("path")
exports.add=(req,res,next)=>{
    console.log("adding")
   
   // console.error(req.body,'i m body')
    //console.log(req.body.expenseamount)
    console.log(req.body.description)

   
    Expenseuser.create({
        expenseamount:req.body.expenseamount,
        description:req.body.description,
        userId:req.user.id
})
.then(expense=>{
    const totalExpense=Number(req.user.totalexpenses)+Number(expenseamount)
    console.log(totalExpense)
    User.update({
        totalExpenses:totalExpense
    },{
        where:{id:req.user.id}
    }).then(async()=>{
        res.status(200).json({expense:expense})
    })
    .catch(async(err)=>{
        return res.status(500).json({success:false,error:err})
    })
})
.catch(async(err)=>{
    return res.status(500).json({success:false,error:err})
})

}
exports.delete=(req,res,next)=>{
   // Expenseuser.findByPk(req.params.id)
   const expenseid=req.params.id
   console.log("this is id",expenseid)
   if(expenseid==undefined||expenseid.length===0){
    return res.status(400).json({success:false})
   }
   Expenseuser.destroy({where:{id:expenseid,userId:req.user.id}})
   .then((noofrows)=>{
    console.log("this is user id",req.user.id)
    console.log(noofrows)
    if(noofrows===0){
      return res.status(404).json({success:false,message:"Expense doent belong to the user"})
    }
        console.log('Destroyed expense')
        res.status(200).json({success:true,message:"Deleted Successfully"})
    })
    .catch(err=>{console.log(err)
    return res.status(500).json({success:true,message:"Failed"})
    })
}

exports.edit=(req,res,next)=>{
    const id=req.params.id
    const uexpense=req.params.expense
    const udescription=req.params.description
    Expenseuser.findByPk(id)
    .then(expenseuser=>{
        expenseuser.expense=uexpense,
        expenseuser.description=udescription
    }).then(result=>{
        console.log('updated expense')
        res.json(result)
    })
    .catch(err=>console.log(err))
}
exports.get = (req, res, next) => {
    console.log("I am getting");
    Expenseuser.findAll({where:{userId:req.user.id}})                                           
      .then(expenseusers => {
        res.json(expenseusers);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching expenses' });
      });
  };

