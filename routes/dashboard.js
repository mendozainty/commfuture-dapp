const express = require('express')
const router = require('express').Router();
const { User, Contract } = require('../middleware/db');
const bodyParser = require('body-parser');


router.use(express.static(__dirname + './public'));
router.use(bodyParser.urlencoded({extended:true}));

router.get('/', (req, res) => {  
  if(req.isAuthenticated()){   
    res.redirect('dashboard/'+ req.user.id) 
  } else {
    res.redirect('/auth/login')
  }
})

router.post('/connectedAccount', (req, res) => {
  let connectedAccount = req.body.connectedAccount;
  User.findOne({connectedAccount: connectedAccount}).then((currentUser) => {
    if(currentUser) {
      res.redirect('/')
    } else {
      User.updateOne({_id: req.user.id}, {connectedAccount: connectedAccount})
        .then((response) => {
        res.send(response);
      })
    }
  })  
  .catch((err) => {
    console.log(err);
  }) 
})

router.get('/:userid',  (req, res) => {  
  const user = req.user;
  res.render('dashboard', { userDashboard: user })
})

router.post('/web3account', (req, res) => {
  
  if(req.user.web3Account.length > 0){
    for(let i=0; i<= req.user.web3Account.length; i++){
      if(req.user.web3Account[i] === req.body.connectedAccount){
        User.updateOne({_id: req.user._id}, {connectedAccount: req.body.connectedAccount})
        .then((result) => {          
          res.send(JSON.stringify(result));
        })
        .catch((err) => {console.log(err);})
      } 
    }  
  } else {
    User.updateOne({_id: req.user._id}, {connectedAccount: req.body.connectedAccount, $push: {web3Account: req.body.connectedAccount}})
      .then((result) => {
        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
      })
      .catch((err) => {console.log(err);})
  }

})

module.exports = router;
