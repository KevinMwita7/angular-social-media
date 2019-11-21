const mongoose = require('mongoose');

let Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

let CommentReplySchema = new Schema({
    parent_id: {type: ObjectId}, 
    author_id: {type: ObjectId},
    author_name: {type: String},
    author_profilePic: {type: String},
    text: {type: String},
}, {timestamps: true});

module.exports = mongoose.model('commentreply', CommentReplySchema);