express=require('express')
const usercontrollers = require('../controllers/usercontroller')
router=express.Router()

router.post('/',usercontrollers.add)
module.exports=router