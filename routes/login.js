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

    User.find({name: name}, user => {
      let valid = user.compareHash(password);
      if (!valid) {
        return res.json({status: 'failure'});
      }
      res.json({token: user.generateToken()});
    });
  });

};
