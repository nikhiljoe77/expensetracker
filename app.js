const expenseroutes=require('./routes/expenseroutes')
const sequelize = require('./utils/database');
const User = require('./models/user');
const auth=require('./middleware/auth')
const Expenseuser = require('./models/expensemodels');
const express=require("express")
const path=require("path")
const cors=require("cors")
const userroute=require(`./routes/userroute`)
const app=express()
app.use(cors())
app.use(express.json())
User.hasMany(Expenseuser)
Expenseuser.belongsTo(User)
app.use(express.static(path.join(__dirname,'public')));
app.use('/',userroute)
//app.use(auth)
app.use('/expense',expenseroutes)
sequelize.sync()
    .then(() => {
        console.log('Database tables have been created.');
        app.listen(4000,()=>{console.log("server is running")})
    })
    .catch((err) => {
        console.error('Error creating database tables:', err);
    });

