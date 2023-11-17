const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    console.log("see the token ",token);
    const user = jwt.verify(token, 'secretencryption');
    console.log('userID>>>>',user.userId);
    User.findByPk(user.userId).then(user => {
      console.log("stringified output for token",JSON.stringify(user));
      req.user = user;
      next();
    }).catch(err => { throw new Error(err)  });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false });
  }
}
module.exports={
    authenticate
}