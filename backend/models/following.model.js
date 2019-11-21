const mongoose = require('mongoose');

let Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

let followingSchema = new Schema({
    user_id: {type: ObjectId, index: true},
    following: {type: Array}
}); 

module.exports = mongoose.model('following', followingSchema);