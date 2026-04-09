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
    const { title, description, stack, githubUrl, liveUrl, id } = req.body;
    

    const updatedProject = await Project.findOneAndUpdate(
      { id: id },   // find exising by id
      {
        title,
        description,
        stack : stack ? stack.split(',') : [],
        githubUrl,
        liveUrl,
        id,
        ...(req.file && { imageUrl: req.file.path })
      },
      {
        new: true,
        upsert: true   // create neww if not found
      }
    );

    res.json(updatedProject);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;