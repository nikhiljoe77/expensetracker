const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  console.log('adding');
  try {
    const { name, password, email } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.error('Error hashing password', err);
        res.status(500).json(err);
      } else {
        await User.create({ name, password: hash, email });
        res.status(201).json({ message: 'Successfully created new user' });
      }
    });
  } catch (err) {
    console.error('This is an error', err);
    res.status(500).json(err);
  }
};


exports.login = async (req, res) => {
  console.log('logging in');
  try {
    const { email, password } = req.body;
    const user = await User.findAll({ where: { email } });
    
    if (user.length > 0) {
      if (await bcrypt.compare(password, user[0].password)) {
        res.status(200).json({ success: true, message: 'User logged in successfully' });
      } else {
        res.status(400).json({ success: false, message: 'Password is incorrect' });
      }
    } else {
      res.status(404).json({ success: false, message: 'User does not exist' });
    }
  } catch (err) {
    console.error('This is an error', err);
    res.status(500).json({ success: false, message: err });
  }
};
