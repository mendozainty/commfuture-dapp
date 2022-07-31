require('dotenv').config({ path: '../.env'})
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const conn = mongoose.createConnection(process.env.MONGODB_URI)
const userSchema = require('../models/userSchema');
userSchema.plugin(passportLocalMongoose);
const User = conn.model('User', userSchema);
const Contract = conn.model('Contract', require('../models/contractSchema'))

module.exports = { User, Contract };