const express=require('express')
const expensecontrollers = require('../controllers/expensecontrollers')
const userauthentication=require('../middleware/auth')
const router=express.Router()
console.log("expense is working")
router.post('/',userauthentication.authenticate,expensecontrollers.add)
router.delete('/deleteexpense/:id',userauthentication.authenticate,expensecontrollers.delete)
router.put('/:id',expensecontrollers.edit)
router.get('/',userauthentication.authenticate,expensecontrollers.get)
router.get('/download',userauthentication.authenticate,expensecontrollers.downloadexpense)

module.exports=router