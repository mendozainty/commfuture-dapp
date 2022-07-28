require('dotenv').config({ path: '../.env'})
const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.MONGODB_URI)
conn.model('User', require('../models/userSchema'))
conn.model('Contract', require('../models/contractSchema'))

module.exports = conn;