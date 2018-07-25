var express = require('express');
var router = express.Router();
import models from '../models/models';
import passport from 'passport';
import LocalStrategy from 'passport-local'
import session from 'express-session'



//
// passport.serializeUser(function(user, done){
//   console.log('SERIALIZE_USER');
//   done(null, user._id);
// });
//
// passport.deserializeUser(function(id) {
//   console.log('DESERIALIZE_USER');
//   model.User.findById(id)
//   .then(function(user) {
//     done(null, user);
//   })
//   .catch(function(error){
//     done(error);
//   });
// });
//
//
// passport.use(new LocalStrategy(function(username, password, done){
//   console.log("LOCAL STRAT");
//   models.User.findOne({ email })
//   .then(function(user){
//     if (!user){
//       console.log("BAD EMAIL");
//       done(null, false);
//     } else if (user.password !== password){
//       console.log("BAD PASSWORD");
//       done(null, false);
//     } else {
//       console.log("SUCCESSSFUL LOGIN");
//       done(null, user);
//     }
//   })
//   .catch(function(error){
//     console.log('ERROR');
//     done(error);
//   })
// }))
//

// app.use(passport.initialize());
// app.use(passport.session());


export default function(passport){

/* GET home page. */
router.get('/signup', function(req, res){
  res.render('signup');
});

router.get('/login', function(req, res) {
  console.log("LOGIN GET");
  res.render('login')
});

router.post('/signup', function(req, res){
  new models.User({
    username: req.body.username,
    password: req.body.password
  }).save()
  .then(function(user){
    res.redirect('/login');
  })
  .catch(function(error){
    console.log("ERROR", error);
    res.json({
    error: error})
  })
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/logout', function(req, res){
  req.logout;
  res.redirect('login')
});


return router;
};//close function
