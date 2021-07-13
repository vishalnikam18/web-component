const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const crypto = require('../crypto');

let cName = '';
//register user
router.post('/', async(req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if the user is already registered or not.
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send(`User with email ${req.body.email} already registered.`);

    cName = req.body.name;
    // User Object Created.
    user = new User({
        name: cName.toUpperCase(),
        email: req.body.email,
        password : crypto.encrypt(req.body.password),
        isAdmin: req.body.isAdmin
    });

    // user added to database.
    await user.save();
    res.send(user);
});

module.exports = router;