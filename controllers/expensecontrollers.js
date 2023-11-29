const Expenseuser=require('../models/expensemodels')
const User = require('../models/user');
const sequelize = require('../utils/database');
const path=require("path")
const AWS=require('aws-sdk');
const { Model } = require('sequelize');
/*exports.add=(req,res,next)=>{
    console.log("adding")
    const t= await sequelize.transaction()
   
   // console.error(req.body,'i m body')
    //console.log(req.body.expenseamount)
    console.log("see the user now",req.user)
    console.log("see the body now",req.body)
    console.log(req.body.description)
    console.log("see the id now",req.user.id)

   
    Expenseuser.create({
        expenseamount:req.body.expenseamount,
        description:req.body.description,
        userId:req.user.id
},{transaction:t})
.then(expense=>{
    const totalExpense=Number(req.user.totalexpense)+Number(req.body.expenseamount)
    console.log(totalExpense)
    User.update({
        totalexpense:totalExpense
    },{
        where:{id:req.user.id},
        transaction:t
    }).then(async()=>{
        await t.commit()
        res.status(200).json({expense:expense})
    })
    .catch(async(err)=>{
       await t.rollback()
        console.log("failed")
        return res.status(500).json({success:false,error:err})
    })
})
.catch(async(err)=>{
    await t.rollback()
    console.log("failed badly")
    return res.status(500).json({success:false,error:err})
})

}*/
exports.add = async (req, res, next) => {
    console.log("adding");
  
    const t = await sequelize.transaction();
  
    try {
      console.log("see the user now", req.user);
      console.log("see the body now", req.body);
      console.log(req.body.description);
      console.log("see the id now", req.user.id);
  
      const expense = await Expenseuser.create({
        expenseamount: req.body.expenseamount,
        description: req.body.description,
        category:req.body.category,
        userId: req.user.id
      }, { transaction: t });
  
      const totalExpense = Number(req.user.totalexpense) + Number(req.body.expenseamount);
      console.log(totalExpense);
  
      await User.update(
        { totalexpense: totalExpense },
        {
          where: { id: req.user.id },
          transaction: t
        }
      );
  
      await t.commit();
  
      res.status(200).json({ expense });
    } catch (err) {
      await t.rollback();
      console.log("failed", err);
      return res.status(500).json({ success: false, error: err });
    }
  };
  

/*exports.delete=async (req,res,next)=>{
    const t= await sequelize.transaction()
    console.log("this is the req body in delete",req.body)
    console.log("this is the req expenseusers",req.expenseuser)
   // Expenseuser.findByPk(req.params.id)
   const expenseid=req.params.id
   console.log("this is id",expenseid)
   if(expenseid==undefined||expenseid.length===0){
    return res.status(400).json({success:false})
   }

   
   const expenseuser= Expenseuser.findAll({where:{id:expenseid,userId:req.user.id}})
    .then((expenseuser)=>{
     console.log("this is the expenserow",expenseuser[0].expenseamount)
     console.log("totalexpense previous",req.user.totalexpense)
     const totalExpense = Number(req.user.totalexpense) - Number(expenseuser[0].expenseamount);
     console.log(totalExpense)
     User.update({
         totalexpense:totalExpense
     },{
         where:{id:req.user.id},
         transaction:t
     }).then(async()=>{
         await t.commit()
        console.log("value updated")
     })
     .catch(async(err)=>{
        await t.rollback()
         console.log("failed")
     })
    })
    .catch(()=>{
        await t.rollback()
     console.log("this is the expenserow failed")
    })
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

}*/


exports.delete = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const expenseid = req.params.id;

    if (!expenseid) {
      await t.rollback();
      return res.status(400).json({ success: false });
    }

    const expenseuser = await Expenseuser.findOne({
      where: { id: expenseid, userId: req.user.id },
      transaction: t,
    });

    if (!expenseuser) {
      await t.rollback();
      return res.status(404).json({ success: false, message: "Expense doesn't belong to the user" });
    }

    const totalExpense = Number(req.user.totalexpense) - Number(expenseuser.expenseamount);

    await User.update(
      { totalexpense: totalExpense },
      { where: { id: req.user.id }, transaction: t }
    );

    await Expenseuser.destroy({
      where: { id: expenseid, userId: req.user.id },
      transaction: t,
    });

    await t.commit();
    console.log('Transaction committed successfully.');

    res.status(200).json({ success: true, message: 'Deleted Successfully' });
  } catch (err) {
    console.error(err);
    await t.rollback();
    return res.status(500).json({ success: false, message: 'Failed' });
  }
};


exports.edit=(req,res,next)=>{
  console.log("you have reached edit")
    const id=req.params.id
    const uexpense=req.params.expense
    const udescription=req.params.description
    const ucategory=req.params.category
    Expenseuser.findByPk(id)
    .then(expenseuser=>{
        expenseuser.expense=uexpense,
        expenseuser.description=udescription,
        expenseuser.category=ucategory
    }).then(result=>{
        console.log('updated expense')
        res.json(result)
    })
    .catch(err=>{
      console.log("it has reache the edit error")
      console.log(err)
      res.json(err)})
}/*
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
  };*/
function uploadToS3(data,filename){
  let s3bucket=new AWS.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    

  })
  
    var params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL:'public-read'
    };

    return new Promise((res,rej)=>s3bucket.upload(params, (err, s3response)=>{
      if(err){
          console.log('something went wrong',err)
          rej(err)
      }else{
          console.log('success',s3response)
          res(s3response.Location);
          
      }
  }))

}

exports.downloadexpense=async(req,res)=>{
  console.log("reached download")
  const expenses=await req.user.get()
  console.log("this is the user's expense",expenses)
  const stringifiedExpenses=JSON.stringify(expenses)
  const filename='Expense.txt'
  const fileURL=await uploadToS3(stringifiedExpenses,filename)
  console.log(fileURL)
  res.status(200).json({fileURL,success:true})

}
exports.get = async (req, res) => {//here also it might be wrong
 // console.log("see the req",req)
  const page=parseInt(req.query.page)
  const limit=parseInt(req.query.limit)
  console.log("this is the page",page)
  console.log("this is the limit",limit)
  const startIndex=(page-1)*limit
  const endIndex=page*limit
  console.log("this is the name and userid ",req.user.name,req.user.id)
  const results={}
  try{
  const expenseuser = await Expenseuser.findAll({
    where: {  userId: req.user.id }
  });
  console.log("this is expenseuser",JSON.stringify(expenseuser))
  console.log("this is the length",expenseuser.length)
  if(endIndex<expenseuser.length)                                      //this is wrong for length 
  {
    results.next={
      page:page+1,
      limit:limit
    }
  }
  if(startIndex>0)
  {
    results.previous={
      page:page-1,
      limit:limit
    }
  }
  results.results=expenseuser.slice(startIndex,endIndex)
  //console.log( "find the results",results.results)
  res.json(results)
}
  /*results.results=model.slice(startIndex,endIndex)
  res.paginatedresults=results//check this also*/

  catch(e){
    res.status(500).json({message:e.message})

  }
}
  