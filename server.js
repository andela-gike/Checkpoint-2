const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

require('dotenv').config();

const app = express(); // setup express app
const port = process.env.PORT || 6000;
// parse incoming request data
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// setup a default catch-all route to send back message
require('./server/routes')(app);

app.listen(port, () => {
  console.log(`The magic happens on port ${port}`);
});

module.exports = app;
