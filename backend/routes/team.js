const express = require('express');
const router = express.Router();
const Team = require('../model/team');

//cloudinary imports
const multer = require('multer');
const storage = require('../config/cloudinary');
const upload = multer({ storage });

//auth import
const verifyToken = require('../auth/auth');

router.get('/', async (req, res) => {   
    try {
        const teams = await Team.find().sort({ createdAt: -1 });
        res.json(teams);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { Name, Role, id, linked } = req.body;
    const imageUrl = req.file ? req.file.path : "";


    const newTeam = new Team({
      Name,
      Role,
      id,
      linked,
      imageUrl
    });


    const team = await newTeam.save();
    

    res.json(team); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;