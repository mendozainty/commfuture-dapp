//jshint esversion:6
require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/userDB');

const userSchema = new mongoose.Schema ({
  email: {
    type: String,
    required: [true]
  },
  password: {
    type: String,
    required: [true]
  }
});

userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});

const User = new mongoose.model('User', userSchema);

app.get('/', function(req, res){
  res.render('home');
});

app.route('/register')
  .get(function(req, res){
    res.render('register');
  })
  .post(function(req, res){
    const user = new User ({
      email: req.body.username,
      password: req.body.password
    })
    User.findOne({email: req.body.username}, function(err, registeredUser){
      if(registeredUser){
        res.send('User already exists')
      } else {
        user.save(function(err){
          if(err){
            console.log(err);
          } else {
            res.render('secrets');
          }
        })    
      }
    })    
  });

app.route('/submit')
  .get(function(req, res){
    res.render('submit');
  })
  /* .post(function(req, res){

  }) */

app.route('/login')
  .get(function(req, res){
    res.render('login');
    })
  .post(function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email: username}, function(err, user){
      if(err){
        console.log(err);
      } else {
        if(user.password === password) {
          res.render('secrets');
        } else {
          res.send("password doesn't match");
        }
      }
    })
  });


app.listen(port, function(){
  console.log(`Running on ${port}`);
})