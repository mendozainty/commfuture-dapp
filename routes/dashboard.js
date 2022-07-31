const router = require('express').Router();
const { User, Contract } = require('../middleware/db');

router.get('/', (req, res) => {
  const user = req.user 
  if(req.isAuthenticated()){   
    res.render('dashboard', { userDashboard: user })   
    console.log(user);       
  } else {
    res.redirect('/auth/login')
  }
})

// router.get('/secrets', (req, res) => {
//   if(req.isAuthenticated()){
//     res.render('secrets')
//   } else {
//     res.redirect('/login')
//   }
// })

// router.get('/dashboard/:user', (req, res) => {
//   var user = req.params.user;

// })


// router.get('/submit', function(req, res){
//     if(req.isAuthenticated()){
//       res.render('submit');
//     } else {
//       res.redirect('/login');
//     }
//   })

// router.post('/submit', function(req, res){
//     submittedSecret = req.body.secret;
//     User.findById(req.user.id, function(err, user){
//       if (err){
//         console.log(err);
//       } else {
//         if (user){
//           user.secret = submittedSecret;
//           user.save(function(){
//             res.redirect('/secrets');
//           });
//         }
//       }
//     });
//   });

module.exports = router;