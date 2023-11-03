const expenseroutes=require('./routes/expenseroutes')
const sequelize = require('./utils/database');
const expenseusers = require('./models/expensemodels');
const express=require("express")
const path=require("path")
const cors=require("cors")
const userroute=require(`./routes/userroute`)
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')));
app.use('/',userroute)
sequelize.sync()
    .then(() => {
        console.log('Database tables have been created.');
    })
    .catch((err) => {
        console.error('Error creating database tables:', err);
    });
app.use('/expense',expenseroutes)
app.listen(4000,()=>{console.log("server is running")})