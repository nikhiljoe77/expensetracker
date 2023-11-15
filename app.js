const expenseroutes = require('./routes/expenseroutes')
require('dotenv').config();
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
app.use(cors())
app.use(express.json())
User.hasMany(Expenseuser)
Expenseuser.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userroute)
app.use('/expense', expenseroutes)
app.use(`/purchase`, purchaseroute)
app.use(`/premium`, premiumFeatureRoutes)


sequelize.sync()
    .then(() => {
        console.log('Database tables have been created.');
        app.listen(4000, () => {
            console.log("Server is running");
        });
    })
    .catch((err) => {
        console.error('Error creating database tables:', err);
    });
