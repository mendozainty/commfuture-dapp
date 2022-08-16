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

router.get('/:userid', (req, res) => {  
  const user = req.user;
  res.render('dashboard', { userDashboard: user })
})

router.post('/web3account', (req, res) => {  
  let currentAccount = req.body.web3account;  
  User.updateOne({_id: req.user.id}, {web3Account: currentAccount})
  .then((response) => {
    res.send(response);
  })
  .catch((err) => {
    console.log(err);
  }) 
})

module.exports = router;