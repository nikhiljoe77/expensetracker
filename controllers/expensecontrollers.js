const Expenseuser=require('../models/expensemodels')
const path=require("path")
exports.add=(req,res,next)=>{
    console.log("adding")
   // console.error(req.body,'i m body')
    //console.log(req.body.expenseamount)
    console.log(req.body.description)

   
    Expenseuser.create({
        expenseamount:req.body.expenseamount,
        description:req.body.description
})
.then(result=>{
res.json(result)
})
.catch(err=>{
    console.log(err)
})

}
exports.delete=(req,res,next)=>{
    Expenseuser.findByPk(req.params.id)
    .then(expenseuser=>{
        return expenseuser.destroy()
    }).then(result=>{
        console.log('Destroyed expense')
        res.json(result)
    })
    .catch(err=>console.log(err))
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
    Expenseuser.findAll()
      .then(expenseusers => {
        res.json(expenseusers);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching expenses' });
      });
  };
  exports.getfile = (req, res, next) => {
    console.log("I am getting");
    Expenseuser.findAll()
      .then(expenseusers => {
        res.sendFile(path.join(__dirname,'public','..', 'expensetracker.html'))
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching expenses' });
      });
  };

