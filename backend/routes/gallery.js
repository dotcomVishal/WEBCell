const express = require('express');
const router = express.Router();
const Gallery = require('../model/gallery');

// multer imports for file handling 
const multer = require('multer');
const storage = require('../config/cloudinary');
const upload = multer({ storage });

//auth import
const verifyToken = require('../auth/auth');

//get routing
router.get('/', async (req, res) => {   
    try {
        const gallery = await Gallery.find().sort({ createdAt: -1 });
        res.json(gallery);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//post routing

router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { description } = req.body;
    const imageUrl = req.file ? req.file.path : "";


    const newGallery = new Gallery({
      description,
      imageUrl
    });

    


    const gallery = await newGallery.save();


    res.json(gallery); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;