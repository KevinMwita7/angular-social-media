const mongoose = require('mongoose');

let Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

let CommentSchema = new Schema({
    discussion_id: { type: ObjectId },
    author_id : { type: ObjectId },
    author_profilePic: { type: String },
    author_name: { type: String }, 
    text: {type: String},
    repliesAmount: {type:Number, default: 0},
    likes: {type:Number, default: 0},
    dislikes: {type: Number, default: 0},
    liked: {type:Boolean, default: false},
    disliked: {type:Boolean, default: false},
}, {timestamps: true});

module.exports = mongoose.model('comment', CommentSchema);