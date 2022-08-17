const { Schema } = require('mongoose')

const userSchema = new Schema (
  {
  username: String,
  email: String,
  password:  String,
  googleId: String,
  facebookID: String,
  twitterId: String,
  connectedAccount: String,  
  web3Account: [String],
  tokenPosition: [{contractId: String}]
});

module.exports = userSchema;
