const express = require('express');
const router = express.Router();
const Project = require('../model/project');

router.get('/', async (req, res) => {   
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, stack, imageUrl, githubUrl, liveUrl } = req.body;


    const newProject = new Project({
      title,
      description,
      stack,
      imageUrl,
      githubUrl,
      liveUrl
    });


    const project = await newProject.save();
    

    res.json(project); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;