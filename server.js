'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let Router = express.Router();

var DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

require(__dirname + '/routes/login.js')(Router);

app.use(Router);

app.listen(3000, () => {
  console.log('server is up on 3000');
});
