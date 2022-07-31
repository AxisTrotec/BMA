var express = require("express");
var router = express.Router();
var user = require("../models/registerModel.js");

//SMS API Variables
const client = require("twilio")(process.env.SID, process.env.auth);

//Email API Variable
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.sendgridapi);

//Secret Key for encryption
var SimpleCrypto = require("simple-crypto-js").default;
const secret = process.env.secretkey;
const simpleCrypto = new SimpleCrypto(secret);

/* Get home page */
router.get("/", function (req, res, next) {
  res.render("register", { title: "Register", data: " " });
});

/* Register route */
router.post("/", function (req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var phone = req.body.phone;

  //Check if account exist
  if (user.findOne({ username: username, email: email, phone: phone }).exec()) {
    res.render("register", { title: "Register", data: "Account exist" });
  } else {
    //Send data into db
    var userData = new user({
      username: username,
      email: email,
      password: password,
      phone: phone,
    });

    userData.save(function (err) {
      if (err) {
        return next(err);
      }

      //Send SMS upon account creation
      client.messages
        .create({
          body: "Hi, " + username + ". You have created an account from BMA",
          from: "+19499466678",
          statusCallback: "http://postb.in/1234abcd",
          to: phone,
        })
        .then((message) => console.log(message.sid));

      //Send email upon account creation
      const msg = {
        to: email,
        from: "mraxis@outlook.com",
        subject: "Account created",
        html:
          "Hi " + username + ", <br> Thanks for creating an account. Have fun!",
      };
      sgMail
        .send(msg)
        .then(() => console.log("Email sent"))
        .catch((error) => {
          console.log(error);
        });
      
      //If successful, redirect to home page
      res.redirect("/");
    });
  }
});

module.exports = router;
