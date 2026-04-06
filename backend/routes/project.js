const express = require('express');
const router = express.Router();
const Project = require('../model/project');

// multer imports for file handling 
const multer = require('multer');
const storage = require('../config/cloudinary');
const upload = multer({ storage });

//auth import
const verifyToken = require('../auth/auth');

//get routing
router.get('/', async (req, res) => {   
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//post routing
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { title, description, stack, githubUrl, liveUrl } = req.body;
    const imageUrl = req.file ? req.file.path : "";


    const newProject = new Project({
      title,
      description,
      stack : stack ? stack.split(',') : [], //cuz its multipart form data
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