const mongoose = require('mongoose');

let Schema = mongoose.Schema, 
ObjectId = Schema.ObjectId;

let AccountSchema = new Schema({
    owner: {type: String},
    owner_id: {type: ObjectId, index: true},
    profilePic:{type: String, default: 'http://localhost:4200/assets/imgs/user.png'},
    preferences: {type: JSON},
    bio:{type:String, default: ''},
    lastLogin:{type:Date},
    lastLogout:{type:Date}
}, {timestamps: true});

module.exports = mongoose.model('Account', AccountSchema);