const db = require('../middleware/db');
const User = db.model('User');



module.exports = {
  findUser: () => {

  },



}


// User.create({ username: 'Lindon', email: 'lin@com'}, (err, user) =>{
//   err ? console.log(err) : console.log(user); 
// })



async function currentUser() {
  let id = userId;
  User.findById(id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
      db.close();
    }
  })
}

var userId = "62e1bc86720c9ec2eda06490";

currentUser(userId)
//console.log(currentUser);
//    node dbMethods.js