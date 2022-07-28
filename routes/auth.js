const router = require('express').Router();
const passport = require('passport');
const dashboardRoutes = require('../routes/dashboard')

router.use("/dashboard", dashboardRoutes)

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
      passport.authenticate('local')(req, res, function(){
      res.redirect('/dashboard');
      })
    }
  })
});

router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out');
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/redirect', 
passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => {
  let user = encodeURIComponent(req.user.id)
  res.redirect(`/dashboard/${user}`)
  console.log(req.user);   
})

router.get('/register', function(req, res){
  res.render('register');  
  })  
  
router.post('/register', function(req, res){             
  User.register({username: req.body.username}, req.body.password, function(err, user){
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