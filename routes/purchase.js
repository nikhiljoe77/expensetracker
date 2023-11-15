const express = require("express");
const purchasecontroller = require('../controllers/purchase');
const authenticatemiddleware = require('../middleware/auth');
const router = express.Router();
console.log("purchase this")


router.get('/premiummembership', authenticatemiddleware.authenticate, purchasecontroller.purchaserpremium);
router.post('/updatetransactionstatus', authenticatemiddleware.authenticate, purchasecontroller.updatetransactionstatus);

module.exports =router
