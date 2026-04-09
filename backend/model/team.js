const mongoose = require('mongoose');

const teamschema = new mongoose.Schema({
      id: {
    type: Number,
    required: true,
    min: 1,
    max: 6
    },
    "Name" : {type : String,
              required : true},
    "Role" : {type : String,
              required : true},
    "linked": {type : String,
              default:"example.com"},
    "imageUrl" : {type : String,
                  default:"example.com"
    }

});
module.exports = mongoose.model('Team', teamschema);
