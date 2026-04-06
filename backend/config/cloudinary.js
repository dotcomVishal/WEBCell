const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    CloudName : process.env.CLOUDNAME,
    APIkey : process.env.APIKEY,
    APIsecret : process.env.APISECTRET
});

const storage = new CloudinaryStorage({
    cloudinary : cloudinary ,
    parameters : {
        folder : "webcell",
        formats: ['png','jpeg','jpg']
    }

});

module.exports = storage