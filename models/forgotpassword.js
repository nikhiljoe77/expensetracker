const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//id, name , password, phone number, role

const Forgotpassword = sequelize.define('forgotpassword', {
    uuid: {
        type:Sequelize.STRING ,
        allowNull: false,
        primaryKey: true
    },
    isActive: Sequelize.BOOLEAN,
    expiresby: Sequelize.DATE,
    UserId: {
        type: Sequelize.INTEGER,
      
      }
})

module.exports = Forgotpassword;