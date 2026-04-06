const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../auth/model');


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const admin = await Admin.findOne({ username });
  
  // Check user and compare password hash in one go
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ error: 'wrong credentials' });
  }

//create token
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;