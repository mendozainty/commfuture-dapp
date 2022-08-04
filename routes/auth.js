require('dotenv').config({ path: '../.env'})
const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const dashboardRoutes = require('../routes/dashboard');
const ipfsRoutes = require('../routes/ipfshash')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../middleware/db');

router.use(bodyParser.urlencoded({extended:true}));
router.use(express.static(__dirname + './public'));
router.use("/dashboard", dashboardRoutes);
router.use("/ipfshash", ipfsRoutes);

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', function(req, res){ 
  const user = new User ({
    username: req.body.username,    
    password: req.body.password
  });
  req.login(user, function(err){
    if(err){
      console.log(err);
    } else {
      passport.authenticate('local') (req, res, () => {
        res.redirect('/auth/dashboard');
      })
    }
  })
});

router.get('/logout', (req, res) => {
  req.logout(function(err){
    if(!err){
      res.redirect('/');
    }
  });  
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/redirect', 
passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => {
  res.redirect('/auth/dashboard')  
})

router.get('/register', function(req, res){  
  res.render('register');  
  })  

router.post('/register', (req, res) => {
  User.register({username: req.body.username, email: req.body.email}, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect('/register');
    } else {
        passport.authenticate('local') (req, res, () => {        
        res.redirect('/auth/dashboard');        
      })
    }
  })
}
);

router.post('/ipfs/hash', (req, res) => {
  console.log(req.body.uploadfile);
})

passport.use(
  new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/redirect",  
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if(currentUser){       
        done(null, currentUser)
      } else {
        new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
          }).save().then((newUser) => {
          done(null, newUser)
        }).catch((err) => {
          console.log(err);
        })
      }
    }); 
  }
));

module.exports = router;