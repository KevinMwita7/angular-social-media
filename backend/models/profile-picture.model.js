const mongoose = require('mongoose');

let Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

let ProfilePictureSchema = new Schema({
    uploader_id: {type: ObjectId},
    filename: {type: String},
    url: {type: String},
    path: {type:String}
}, {timestamps:true});

module.exports = mongoose.model('ProfilePictures', ProfilePictureSchema);