const express = require('express')
const router = require('express').Router();
const { User, Contract } = require('../middleware/db');

router.use(express.static(__dirname + './public'));

router.get('/', (req, res) => {  
  if(req.isAuthenticated()){   
    res.redirect('dashboard/'+ req.user.id) 
  } else {
    res.redirect('/auth/login')
  }
})

router.get('/:userid', (req, res) => {
  const user = req.user;
  res.render('dashboard', { userDashboard: user })
})

// router.post('/auth/dashboard/web3account', (req, res) => {
//   let currentAccount = req.body.web3Account;
//   User.updateOne({id: req.user.id}, {web3Account: currentAccount})
//   .then((user) => {
//     console.log(user);
//   })
// })

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