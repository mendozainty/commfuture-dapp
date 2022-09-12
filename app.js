//jshint esversion:6
require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const app = express();
app.disable('x-powered-by')
const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/', function(req, res){
  res.render('home');
});

app.listen(port, function(){
  console.log(`Running on ${port}`);
})


