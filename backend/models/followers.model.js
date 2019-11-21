const mongoose = require('mongoose');

let Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

let FollowersSchema = new Schema({
    user_id: {type: ObjectId, index: true},
    followers : {type: Array}
});

module.exports = mongoose.model('Followers', FollowersSchema);
