const mongoose = require('mongoose');

const activeworkschema = new mongoose.Schema({
    "title" : {type : String,
              required : true},
    "description" : {type : String,
              required : true},
    "people" : {type : String}

});
module.exports = mongoose.model('activework', activeworkschema);