const Sequelize=require('sequelize')
const sequelize=require('../utils/database')
const Expenseuser=sequelize.define('expenseuser',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
       allownull:false,
       primaryKey:true 

    },
   expenseamount:{
        type:Sequelize.INTEGER,
        allownull:false,
    },
    description:{
        type:Sequelize.STRING,
        allownull:false
    },
    category:{
        type:Sequelize.STRING,
        allownull:false
    }
    
},
{
    timestamps:false
 } )
 module.exports=Expenseuser