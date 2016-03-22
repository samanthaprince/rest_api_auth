'use strict';

let jwt = require('jsonwebtoken');
let User = require(__dirname + '/../models/user');

module.exports = (router) => {
  router.post('/login', (req, res) => {
    console.log(req.headers.authorization);
    let authArray = req.headers.authorization.split(' ');
    let method = authArray[0];
    let base64ed = authArray[1];
    let newAuthArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = newAuthArray[0];
    let password = newAuthArray[1];
    console.log(method);
    console.log(name);
    console.log(password);

    var newUser = new User({name: name, password: password });
    newUser.save((err, user) => {
      if (err) {
        console.error(err);
      }
      console.log('in new user save');
      return (user);
    });

    User.findOne({name: name}, (err, user) => {
      console.log('name ' + name);
      console.log('user ' + user);
      let valid = user.compareHash(password);
      if (!valid) {
        return res.json({status: 'failure'});
      }
      var myToken = user.generateToken();
      res.json({token: myToken});
      
      console.log('token' + myToken);
    });
  });

};
