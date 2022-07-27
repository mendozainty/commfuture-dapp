require('dotenv').config({ path: '../.env'})
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
var axios = require('axios');

const contractObject = {
  contractAddress: String,
  nftPosition: [
    {
    tokenID: Number,
    owner: String,    
    sellSide: String,
    buySide: String,
    tokenUri: String,        
    mintHash: String,
    approvedOperator: [String],
    approvalHash: [String],
    isActive: Boolean,
    paymentUri: String,
    paymentHash: String,    
    deliveryUri: String,
    buyerApproved: Boolean,
    burnHash: String
    }
  ]
}
const contractSchema = new mongoose.Schema (contractObject)

const userObject = {
  username: String,
  email: String,
  password:  String,
  socialMediaId: [
    {googleId: String},
    {facebookID: String},
    {twitterId: String}
  ],  
  web3Account: [String],
  contracts: contractSchema,
  version: 1
}

socialMediaId[0].googleId
const userSchema = new mongoose.Schema (userObject);

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);
 
module.exports = {
  queryBuildUp: (action, {projection}, {filter}) => {
    var apiAction = action;
    var apiProjections = {projection};
    var apiFilter = {filter};
    
    var data = JSON.stringify({
      "dataSource": "Cluster0",  
      "database": "cfn-dapp",
      "collection": "user",
      apiProjections,
      apiFilter
    });
  
    var config = {
      method: 'post',
      url: `https://data.mongodb-api.com/app/data-dfhlo/endpoint/data/v1/action/${apiAction}`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.MONGO_API_KEY,
        'Accept': 'application/ejson'
      },
      data: data
    };  
    return config;    
  },

  queryConn: (config) => { 
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
  } 
           
  
              
  
  
// findOne
// find
// insertOne
// deleteOne
// updateOne

  


}

