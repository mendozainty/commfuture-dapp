const { Schema } = require('mongoose')

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
  tokenPosition: [{contractId: string}]
});

module.exports = userSchema;
