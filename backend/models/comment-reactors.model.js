const mongoose = require('mongoose');

const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const CommentLikersSchema = new Schema({
    comment_id: {type:ObjectId, index:true},
    likers: {type:Array, default: []},
    dislikers: {type:Array, default: []}
});

module.exports = mongoose.model('comment_likers', CommentLikersSchema);