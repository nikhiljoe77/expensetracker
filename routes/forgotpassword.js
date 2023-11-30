const express = require("express");
const forgotpassword = require('../controllers/forgotpassword');
const router = express.Router();
console.log("forgot passwrd this")
router.post('/forgotpassword',forgotpassword.forgotpassword);
router.get("/resetpassword/:uuid",forgotpassword.resetpassword);
router.get("/updatepassword/:uuid",forgotpassword.updatepassword);
module.exports =router