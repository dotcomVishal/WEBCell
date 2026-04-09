const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    "id": {
    type: Number,
    required: true,
    min: 1,
    max: 6
    },

    title : { type: String,
              required: true },

    description : { type: String,
                    required: true },

    stack : [{ type: String}],

    imageUrl : { type: String, required: true },

    githubUrl : { type: String},

    liveUrl : { type: String}
});

module.exports = mongoose.model('Project', projectSchema);