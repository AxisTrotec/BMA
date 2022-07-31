var express = require('express');
var router = express.Router();
var User = require("../models/registerModel.js");

/* Decryption keeps failing, will update in the future */
// var SimpleCrypto = require("simple-crypto-js").default
// const secret = process.env.secretkey
// const simpleCrypto = new SimpleCrypto(secret)


/* Get home page */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Login' });
});

/* Login route */
router.post('/', function(req, res, next) {
  try {
    var email = req.body.email
    var password = req.body.password  
    
    //Find if email exist -> decrypt password -> if true, login, else, error
    User.findOne({email: email}).exec(function(err, data) {
      if(err){
        res.render('signup', { title: 'Login', data: 'Email is not used'});
      }

      if(data.password == password){
        res.redirect("/");
      } else {
        res.render('signup', { title: 'Login', data: 'Email or Password does not match'});
      }

      /* Decryption keeps failing, will update in the future */
      // var decryptedInfo = {
      //   username: data.username,
      //   email: data.email,
      //   password: data.password
      // }
      // const decrypted = simpleCrypto.decrypt(decryptedInfo.password)

      // if(decrypted == password){
      //   res.render('/')
      // } else {
      //   res.render('signup', { title: 'Login', data: 'Email or Password does not match'});
      // }
    })
  } catch(e){
    res.render('signup', { title: 'Login', data: 'Error: ' + e});
  }
}); 

module.exports = router;