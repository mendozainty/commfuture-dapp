const router = require('express').Router();
const db = require('../middleware/db');
const User = db.model('User');
const Contract = db.model('Contract');

router.get('/dashboard/:user', (req, res) => {
  var user = req.params.user;

})


app.route('/submit')
  .get(function(req, res){
    if(req.isAuthenticated()){
      res.render('submit');
    } else {
      res.redirect('/login');
    }
  })
  .post(function(req, res){
    submittedSecret = req.body.secret;
    User.findById(req.user.id, function(err, user){
      if (err){
        console.log(err);
      } else {
        if (user){
          user.secret = submittedSecret;
          user.save(function(){
            res.redirect('/secrets');
          });
        }
      }
    });
  });

module.exports = router;