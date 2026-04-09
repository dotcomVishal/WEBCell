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

    const updatedTeam = await Team.findOneAndUpdate(
      { id: id },   // find exising by id
      {
        Name,
        Role,
        id,
        linked,
        ...(req.file && { imageUrl: req.file.path })
      },
      {
        new: true,
        upsert: true   // create neww if not found
      }
    );

    res.json(updatedTeam);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
