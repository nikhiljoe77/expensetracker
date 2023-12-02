require('dotenv').config();
console.log("process parameters are", process.env.DATABASE_NAME,
process.env.DATABASE_USERNAME,
process.env.DATABASE_PASSWORD,)
console.log("keys are",process.env.RAZORPAY_KEY_ID)
const expenseroutes = require('./routes/expenseroutes')
const passwordroutes=require(`./routes/forgotpassword`)
const Forgotpassword = require('./models/forgotpassword');
const helmet=require("helmet")
const morgan=require("morgan")
const fs=require("fs")
const sequelize = require('./utils/database');
const User = require('./models/user');
const Order = require(`./models/orders.js`)
const auth = require('./middleware/auth')
const Expenseuser = require('./models/expensemodels');
const express = require("express")
const path = require("path")
const cors = require("cors")
const userroute = require(`./routes/userroute`)
const purchaseroute = require(`./routes/purchase`)
const premiumFeatureRoutes = require(`./routes/premiumFeature`)
const app = express()
const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan('combined',{stream:accessLogStream}))
User.hasMany(Expenseuser)
Expenseuser.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userroute)
app.use('/expense', expenseroutes)
app.use(`/purchase`, purchaseroute)
app.use(`/premium`, premiumFeatureRoutes)
app.use(`/password`, passwordroutes)


sequelize.sync()
    .then(() => {
        console.log('Database tables have been created.');
        app.listen(process.env.PORT, () => {
            console.log("Server is running");
        });
    })
    .catch((err) => {
        console.error('Error creating database tables:', err);
    });
