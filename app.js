//jshint esversion:6
require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const res = require('express/lib/response');
const client = require('./middleware/db')
const User = require('./middleware/db')

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",  
  },
  function(accessToken, refreshToken, profile, email, cb) {
    User.findOne({username: email.emails[0].value}, function (err, user) { 
      if(err){
        return cb(err);
      }
      if(!user){
        const newUser = new User ({
          username: email.emails[0].value,
          socialMediaId: email.id
        });
        newUser.save(function(err){
          if(err) console.log(err);
          return cb(err, user);           
        });
      } else {
        return cb(err, user);
      }; 
    }); 
  }
));


app.get('/', function(req, res){
  res.render('home');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email']})
);

app.get('/auth/google/secrets',
  passport.authenticate('google', {failureRedirect: '/login'}),
  function(req, res){
    res.redirect('/secrets');
  }
);

app.get('/secrets', function(req, res){
  User.find({'secret': {$ne: null}}, function(err, foundUsers){
    if(err){
      console.log(err);
    } else {
      if (foundUsers){
        res.render('secrets', {userWithSecrets: foundUsers});
      }
    }
  })
});

app.get('/logout', function(req, res){
  req.logout(function(err){
    if(!err){
      res.redirect('/');
    }
  });  
});

app.route('/register')
  .get(function(req, res){
    res.render('register');
  })
  .post(function(req, res){             
        User.register({username: req.body.username}, req.body.password, function(err, user){
          if(err){
            console.log(err);
            res.redirect('/register');
          } else {
            passport.authenticate('local')(req, res, function(){
              res.redirect('/secrets');
            })
          }
        }) 
  });

app.route('/submit')
  .get(function(req, res){
    if(req.isAuthenticated()){
      res.render('submit');
    } else {
      res.redirect('/login');
    }
  })
  .post(function(req, res){
    submittedSecret = req.body.secret;
    User.findById(req.user.id, function(err, user){
      if (err){
        console.log(err);
      } else {
        if (user){
          user.secret = submittedSecret;
          user.save(function(){
            res.redirect('/secrets');
          });
        }
      }
    });
  });

app.route('/login')
  .get(function(req, res){
    res.render('login');
    })
  .post(function(req, res){ 
    
    const user = new User ({
      username: req.body.username,
      password: req.body.password
    });

    req.login(user, function(err){
      if(err){
        console.log(err);
      } else {
        passport.authenticate('local')(req, res, function(){
          res.redirect('/secrets');
        })
      }
    })
  });


app.listen(port, function(){
  console.log(`Running on ${port}`);
})