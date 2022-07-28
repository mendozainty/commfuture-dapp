require('dotenv').config({ path: '../.env'})
const router = require('express').Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const dashboardRoutes = require('../routes/dashboard');
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../middleware/db');
const User = db.model('User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const ejs = require('ejs');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


router.use("/dashboard", dashboardRoutes);
router.use(bodyParser.urlencoded({extended:true}));


router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', function(req, res){ 
  const user = new User ({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  req.login(user, function(err){
    if(err){
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, () => {
      res.redirect('/auth/dashboard/secrets');
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

router.post('/register', function(req, res){             
  User.register({username: req.body.username}, req.body.email, req.body.password, function(err, user){
    if(err){
      console.log(err);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, function(){
      res.redirect('/auth/dashboard');
      })
    }
  }) 
});

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

passport.use(
  new LocalStrategy(({user}, done) => {
    User.findOne({username: user.username}).then((currentUser) => {
      if(currentUser){
          bcrypt.hash(user.password, saltRounds).then((hash) => {
          bcrypt.compare(hash, currentUser.password).then((result) => {
            return result;
          }).catch((err) => {
            console.log(err);
          })
        }).then((currentUser) => {
          done(null, currentUser)
        })
      } else {
        bcrypt.hash(user.password, saltRounds).then((hash) =>{
          new User({
            username: user.username,
            email: user.email,
            password: hash
          }).save().then((newUser) => {
            console.log(newUser);
            //done(null, newUser)
          })
        })
        
      }
    })
  })
)


module.exports = router;