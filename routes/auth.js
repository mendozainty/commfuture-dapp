const router = require('express').Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const dashboardRoutes = require('../routes/dashboard');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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
      passport.authenticate('local')(req, res, function(){
      res.redirect('/dashboard');
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
  res.redirect(`/dashboard/`)
  console.log(req.user);   
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
      res.redirect('/dashboard');
      })
    }
  }) 
});

module.exports = router;