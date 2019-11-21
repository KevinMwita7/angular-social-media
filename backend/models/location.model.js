const mongoose = require('mongoose');

let Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

let LocationSchema = new Schema({
    owner_id: {type: ObjectId, index: true},
    city: {type: String, default: ''},
    country: {type: String, default: ''}//see if there is a way to automatically detect country
});

module.exports = mongoose.model('Location', LocationSchema);