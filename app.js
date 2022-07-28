//jshint esversion:6
require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const passport = require('passport')

const session = require('express-session');
const authRoutes = require('./routes/auth')

const app = express();
const port = process.env.PORT || 3000;



app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/', function(req, res){
  res.render('home');
});

app.listen(port, function(){
  console.log(`Running on ${port}`);
})