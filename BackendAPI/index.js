const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();
app.use(express.json());


var corsOptions = {
  origin: ['http://localhost:5000','http://172.27.61.85:4200','http://localhost:4200','http://172.27.60.159:4200']
};

app.use(cors(corsOptions));


  mongoose.connect('mongodb://localhost/evaluationSystem')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

app.use('/api/users', users);
app.use('/api/auth', auth);

// Require Candidate routes
require('./routes/candidate.route.js')(app);

// Require Recruiter routes
require('./routes/recruiter.route.js')(app);

//Require Skill routes
require('./routes/skill.route')(app); 

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));