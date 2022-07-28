// require('dotenv').config({ path: '../.env'})
// const passport = require('passport');
// const LocalStrategy = require('passport-local')
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const db = require('../middleware/db');
// const User = db.model('User');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   });
// });

// module.exports = {
//   passportGoogle: async () => {
//     try {
//       passport.use(
//         new GoogleStrategy({
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         callbackURL: "http://localhost:3000/auth/google/redirect",  
//         }, (accessToken, refreshToken, profile, done) => {
//           User.findOne({socialMediaId: [{googleId: profile.id}]}).then((currentUser) => {
//             if(currentUser){
//               console.log(currentUser);
//               done(null, currentUser)
//             } else {
//               new User({
//                 username: profile.displayName,
//                 socialMediaId: [
//                   {googleId: profile.id}
//                 ]
//               }).save().then((newUser) => {
//                 console.log(newUser);
//                 done(null, newUser)
//               }).catch((err) => {
//                 console.log(err);
//               })
//             }
//           }); 
//         }
//       ))
//     } catch (err) {
//       done(null, 'enable to authenticate with Google')
//     }
    
//   }
// }


// passport.use(
//   new LocalStrategy(({user}, done) => {
//     User.findOne({username: user.username}).then((currentUser) => {
//       if(currentUser){
//         console.log(currentUser);
//         bcrypt.hash(user.password, saltRounds).then((hash) => {
//           bcrypt.compare(hash, currentUser.password).then((result) => {
//             return result;
//           }).catch((err) => {
//             console.log(err);
//           })
//         }).then((currentUser) => {
//           done(null, currentUser)
//         })
//       } else {
//         bcrypt.hash(user.password, saltRounds).then((hash) =>{
//           new User({
//             username: user.username,
//             email: user.email,
//             password: hash
//           }).save().then((newUser) => {
//             console.log(newUser);
//             //done(null, newUser)
//           })
//         })
        
//       }
//     })
//   })
// )
