'use strict';
const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');

const userSchema = mongoose.Schema({
  EmailAddress: {type: String, required: true},
  password: {type: String,required: true},
  DateOfConcussion: {type: Date, required:true}
});
userSchema.methods.serialize = function() {
    return {
      id: this._id,
      EmailAddress: this.EmailAddress,
      DateOfConcussion: this.DateOfConcussion
    };
  }
  
  userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
  }
  
  userSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
  };
  // note that all instance methods and virtual properties on our
  // schema must be defined *before* we make the call to `.model`.
  const SlamCrownUser = mongoose.model('User', userSchema);
  module.exports = {SlamCrownUser};