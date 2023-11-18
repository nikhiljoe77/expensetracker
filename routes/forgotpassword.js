const express = require("express");
const forgotpassword = require('../controllers/forgotpassword');
const router = express.Router();
console.log("forgot passwrd this")
router.post('/forgotpassword', forgotpassword.forgotpassword);
module.exports =router