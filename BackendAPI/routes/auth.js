const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const crypto = require('../crypto');
const jwt = require('jsonwebtoken');
let token;
let role;
var decodedData = "";
const secret = 'evaluation-system';

// Login Data Functionality.
router.post('/', async(req, res) => {

    const { error } = validate(req.body);
   
    if (error) return res.status(400).send(error.details[0].message);

    // Fetch data from Database
    await User.findOne({ email: req.body.email}).then(user => {

    if(crypto.decrypt(user.password) !== req.body.password || !user)
    {
        return res.status(400).send('Invalid email or password.');
    }
    if(user.isAdmin)
    {
        role = 'Admin';
    } else
    {
        role = 'Interviewer';
    }

    //Payload user data
     var userData = 
    {
        "name": user.name,
        "email": user.email,
        "role" : role,
    }     
    //Token Creation
    token = jwt.sign(userData,secret, {expiresIn: '3h'});
    res.status(200).send({token});


    }).catch(err => {
       return res.status(400).send("Invalid Email or Password."
        );
    });

});

// Token validation  if success send the user data else send invalid token message.
router.get('/userData/:token',(req,res)=>{

    let incomingToken = req.params.token;
    jwt.verify(incomingToken,secret,(err,tokenData)=>{
      if(err)
      {
        return res.status(400).send("Invalid Request")
      }
      if(tokenData)
      {
        decodedData = tokenData;
        return res.status(200).send(decodedData);
      }
    })
});



function validate(req) {
    const schema = {
        email: Joi.string().min(4).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;