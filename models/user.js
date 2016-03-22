'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let userSchema = mongoose.Schema({
  name:     {type: String, required: true, unique: true},
  // group: {type: String, required: true},
  password: {type: String, required: true}
});

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
});

userSchema.methods.compareHash = function(password) {
  console.log('password is: ' + password);
  console.log('this.password is: ' + this.password);
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function() {
  console.log('this.id inside gen token' + this._id);
  return jwt.sign({_id: this._id}, 'CHANGE ME');
};

let User = mongoose.model('User', userSchema);
module.exports = User;
