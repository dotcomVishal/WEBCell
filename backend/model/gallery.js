const mongoose = require('mongoose');

const galleryschema = new mongoose.Schema({
    
    
    "description" : {type : String,
              required : true},
    
    "imageUrl" : {type : String,
                  default:"example.com"
    }

});
module.exports = mongoose.model('Gallery', galleryschema);