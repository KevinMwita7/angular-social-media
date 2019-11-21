const Images = require('../models/images.model');

module.exports = {
    updateImagesUploaderProfilePic: function(uploader_id, newProfilePicURL){
        Images.find({uploader_id: uploader_id}, (err, images) => {
            if(err) console.log(err);
            images.forEach(image => {
                image.uploaderProfilePic = newProfilePicURL;
                image.save((error, image) => {
                    if(error) console.log(error);
                });
            });
        });
    }
};