const Expenseuser=require('../models/expensemodels')
const User = require('../models/user');
const sequelize = require('../utils/database');
const path=require("path")
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

