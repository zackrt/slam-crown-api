'use strict';
const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');

const userSchema = new mongoose.Schema({
  emailAddress: {type: String, required: true},
  password: {type: String, required: true},
  dateOfConcussion: {type: Date, required:true},
  painLevel: {type: Number},
  othersymptom: {type: String},
  selectedSymptoms: {type: String}
});
userSchema.methods.serialize = function() {
    return {
      id: this._id,
      emailAddress: this.emailAddress,
      dateOfConcussion: this.dateOfConcussion,
      painLevel: this.painLevel,
      othersymptom: this.othersymptom,
      selectedSymptoms: this.selectedSymptoms
    };
  }
// bcrpyt password hashing cipher: encryption  
  userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }
  
  userSchema.statics.hashPassword = function (password) {
    return bcrypt.hashSync(password, 10);
  };
  // note that all instance methods and virtual properties on our
  // schema must be defined *before* we make the call to `.model`.
  const User = mongoose.model('User', userSchema);
  module.exports = {User};