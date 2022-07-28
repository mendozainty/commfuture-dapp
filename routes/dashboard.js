const router = require('express').Router();
const db = require('../middleware/db');
const bodyParser = require('body-parser');
const User = db.model('User');
const Contract = db.model('Contract');


router.use(bodyParser.urlencoded({extended:true}));

router.get('/', (req, res) => {  
  User.findById(req.user.id, (err, user) => {
    if (err) { console.log(err);}
    else {
      if (user) {        
        res.render('dashboard', { userDashboard: user})
      }
    }
  })      
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