const Sequelize=require('sequelize')
const sequelize=new Sequelize('expense','root','SQLSQL',{
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequelize
