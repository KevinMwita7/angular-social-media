const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const TextPostSchema = new Schema({
 uploader_id: {type: ObjectId, index: true},
 uploader: {type: String},
 uploaderProfilePic: {type:String},
 title: {type:String},
 description: {type:String},
 type: {type:String, default: 'text'},
 likes: {type: Number, default: 0},
 liked: {type: Boolean, default: false},
 likers: {type: Array, default: []},
 commentsAmount: {type:Number, default:0}
},{timestamps:true});

module.exports = mongoose.model('text_post', TextPostSchema);