const { Schema } = require('mongoose')


const contractSchema = new Schema ({
  contractAddress: String,
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
})

module.exports = contractSchema;
