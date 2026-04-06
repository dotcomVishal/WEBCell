const express = require('express');
const router = express.Router();
const Project = require('../model/activework');


//auth import
const verifyToken = require('../auth/auth');
const activework = require('../model/activework');

//get routing
router.get('/', async (req, res) => {   
    try {
        const activeworks = await activework.find().sort({ createdAt: -1 });
        res.json(activeworks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


//post routing
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;


    const newProject = new Project({
      title,
      description
    });


    const project = await newProject.save();
    

    res.json(project); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;