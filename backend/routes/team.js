const express = require('express');
const router = express.Router();
const Team = require('../model/team');

router.get('/', async (req, res) => {   
    try {
        const teams = await Team.find().sort({ createdAt: -1 });
        res.json(teams);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
  try {
    const { Name, Role, imageUrl } = req.body;


    const newTeam = new Team({
      Name,
      Role,
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