const { Schema } = require('mongoose')
const contractSchema = require('../models/contractSchema')

const userSchema = new Schema (
  {
  username: String,
  email: String,
  password:  String,
  socialMediaId: [
    {googleId: String},
    {facebookID: String},
    {twitterId: String}
  ],  
  web3Account: [String],
  contracts: contractSchema
});

module.exports = userSchema;
