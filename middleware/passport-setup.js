require('dotenv').config({ path: '../.env'})
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../middleware/db');
const User = db.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
      done(null, user);
  });
});


passport.use(
  new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "/auth/google/redirect",  
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({socialMediaId: [{googleId: profile.id}]}).then((currentUser) => {
      if(currentUser){
        console.log(currentUser);
        done(null, currentUser)
      } else {
        new User({
          username: profile.displayName,
          socialMediaId: [
            {googleId: profile.id}
          ]
        }).save().then((newUser) => {
          console.log(newUser);
          done(null, newUser)
        }).catch((err) => {
          console.log(err);
        })
      }
    }); 
  }
));
