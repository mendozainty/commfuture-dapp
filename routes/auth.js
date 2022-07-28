const router = require('express').Router();
const passport = require('passport');
const dashboardRoutes = require('../routes/dashboard')

router.use("/dashboard", dashboardRoutes)

router.get('/login', (req, res, next) => {
  res.render('login');
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
  res.redirect('/dashboard')
  console.log(req.user);   
})


module.exports = router;