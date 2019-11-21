const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jsonwebtoken = require('jsonwebtoken');

const Schema = mongoose.Schema;

const CredentialsSchema = new Schema({
    //account_id: {type: ObjectId},
    username: {type: String, required: true, index: true, unique: true},
    //prevent sneaky folks from registering twice. Have them go through the trouble of providing another email address hahahaha.
    email: {type: String, required: true, lowercase: true, match: /\S+@\S+\.\S+/, index: true, unique: true},
    hash: {type: String, required: true, index: true},
}, {timestamps: true});


CredentialsSchema.plugin(uniqueValidator);
CredentialsSchema.methods.generateJwt = function() {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jsonwebtoken.sign({
      _id: this._id,
      email: this.email,
      username: this.username,
      exp: parseInt(expiry.getTime() / 1000),
    }, "SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };

  module.exports = mongoose.model('Credentials', CredentialsSchema);
