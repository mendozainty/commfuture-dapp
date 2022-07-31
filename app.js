//jshint esversion:6
require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard')

const app = express();
app.disable('x-powered-by')
const port = process.env.PORT || 3000;


// app.use((req, res, next) => {res.status(404).send("Sorry can't find this page!")})
// app.use((err, req, res, next) => {console.error(err.stack);res.status(500).send('Something went wrong...')})
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
app.use('/dasboard', dashboardRoutes);

app.get('/', function(req, res){
  res.render('home');
});

app.listen(port, function(){
  console.log(`Running on ${port}`);
})