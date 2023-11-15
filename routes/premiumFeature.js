const express = require("express");
const premiumFeature = require('../controllers/premiumFeature');
const authenticatemiddleware = require('../middleware/auth');
const router = express.Router();
router.get('/showLeaderBoard', authenticatemiddleware.authenticate, premiumFeature.getLeaderBoard);
module.exports = router