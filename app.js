const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost/APIAuthentication');


//Middleware 
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use('/users', require('./routes/users'));




const port = process.env.PORT || 4000;
app.listen(port);