express=require('express')
const expensecontrollers = require('../controllers/expensecontrollers')
router=express.Router()
console.log("expense is working")
router.post('/',expensecontrollers.add)
router.delete('/:id',expensecontrollers.delete)
router.put('/:id',expensecontrollers.edit)
router.get('/getfile',expensecontrollers.getfile)
router.get('/',expensecontrollers.get)

module.exports=router