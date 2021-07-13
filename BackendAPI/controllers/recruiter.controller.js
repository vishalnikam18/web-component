const Recruiter = require('../models/recruiter.js');

// Create and Save a new recruiter
exports.create = (req, res) => {

    // Create a recruiter Objectt
    const recruiter = new Recruiter({
        EmployeeId: req.body.EmployeeId,
        Name: req.body.Name
    });

    // Save candidate in the database
    recruiter.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the candidate."
            });
        });
};

// Retrieve and return all recruiters from the database.
exports.findAll = (req, res) => {
    Recruiter.find()
        .then(recruiters => {
            res.send(recruiters);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving candidates."
            });
        });
};