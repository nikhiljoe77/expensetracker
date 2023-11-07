const express=require('express')
const usercontrollers = require('../controllers/usercontroller')
const router=express.Router()

router.post('/signup',usercontrollers.signup)
router.post('/login',usercontrollers.login)
module.exports=router