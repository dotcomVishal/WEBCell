const mongoose = require('mongoose');

const teamschema = new mongoose.Schema({
    "Name" : {type : String,
              required : true},
    "Role" : {type : String,
              required : true},
    "imageUrl" : {type : String,
                  default:"example.com"
    }

});
module.exports = mongoose.model('Team', teamschema);
