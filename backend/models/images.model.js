const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

//create a link to user for the one to one relationship to get info like atrist's name and location
let imagesSchema = new Schema({
    uploader_id: {type: ObjectId, index: true},
    uploader: {type: String},
    uploaderProfilePic: {type: String},
    title: {type: String},
    description: {type: String},
    filename: {type: String},
    url:{type: String},
    type: {type:String, default: 'image'},
    likes: {type: Number, default: 0},
    liked: {type: Boolean},
    likers:{type: Array, default: []},
    commentsAmount: {type: Number, default: 0},
    path: {type: String}
}, {timestamps: true/*, toJSON: {virtuals: true}, toObject: {virtuals: true}*/});

module.exports = mongoose.model('Images', imagesSchema);