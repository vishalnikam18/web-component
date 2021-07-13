const { request } = require('express');
const Candidate = require('../models/candidate.model.js');
// Create and Save a new candidate
exports.create = (req, res) => {
    // Create a candidate Object

    const candidate = new Candidate({
        interviewType: req.body.interviewType,
        candidateName: req.body.candidateName,
        project: req.body.project,
        recruiterName: req.body.recruiterName,
        interviewDate: req.body.interviewDate,
        interviewRound: req.body.interviewRound,
        interviewMode: req.body.interviewMode,
        interviewer: req.body.interviewer,
        status: req.body.status,
        designation: req.body.designation,
        exp: req.body.exp,
        phoneNumber: req.body.phoneNumber,
        joiningStatus: req.body.joiningStatus,
        profileSummery: req.body.profileSummery,
        feedback: req.body.feedback,
        flag: req.body.flag,
        email: req.body.email,
        skill_name: req.body.skill_name
    });

    // Save candidate in the database
    candidate.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the candidate."
            });
        });
};

//Retrieve all the interviewer names
exports.findInterviewer = (
    req, res
) => {
    Candidate.distinct('interviewer').then(interviewers => {
        res.send(interviewers);
    }).catch(err => {
        res.status(500).send({


            message: err.message || "Some error occurred while retrieving candidates."
        })
    })
}
// Retrieve and return all candidates from the database.
exports.findAll = (req, res) => {
    Candidate.find().sort({ "createdAt": -1 })
        .then(candidates => {
            res.send(candidates);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving candidates."
            });
        });
};

// Retrieve and return all candidates from the database.
exports.demo = (req, res) => {

    Candidate.find({ interviewMode: { $in: ['Teams', 'Skype', 'Call'] } }).sort({ "createdAt": -1 })
        .then(candidates => {
            res.send(candidates);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving candidates."
            });
        });
};

// Filter Based on candidate details
exports.findBasedOnFilter = (req, res) => {
    var query = {};
    if (req.query.interviewType) query.interviewType = req.query.interviewType;
    if (req.query.interviewMode) query.interviewMode = req.query.interviewMode;
    if (req.query.interviewer) query.interviewer = req.query.interviewer;
    if (req.query.status) query.status = req.query.status;
    if (req.query.joiningStatus) query.joiningStatus = req.query.joiningStatus;
    // { $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }

    if (req.query.flag === 'true') {
        Candidate.find().sort({ "interviewDate": -1 })
            .then(candidates => {
                res.send(candidates);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving candidates."
                });
            });
    } else {

        Candidate.find(query).sort({ "interviewDate": -1 })
            .then((candidates) => {
                res.send(candidates);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving candidates.",
                });
            });
    }
};

// Find a single candidate with a candidateId
exports.findOne = (req, res) => {
    Candidate.findById(req.params.candidateId)
        .then(candidate => {
            if (!candidate) {
                return res.status(404).send({
                    message: "candidate not found with id " + req.params.candidateId
                });
            }
            res.send(candidate);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "candidate not found with id " + req.params.candidateId
                });
            }
            return res.status(500).send({
                message: "Error retrieving candidate with id " + req.params.candidateId
            });
        });
};


// Update a candidate identified by the candidateId in the request
exports.update = (req, res) => {
    // Find candidate and update it with the request body
    Candidate.findByIdAndUpdate(req.params.candidateId, {
        interviewType: req.body.interviewType,
        candidateName: req.body.candidateName,
        project: req.body.project,
        recruiterName: req.body.recruiterName,
        interviewDate: req.body.interviewDate,
        interviewRound: req.body.interviewRound,
        interviewMode: req.body.interviewMode,
        interviewer: req.body.interviewer,
        status: req.body.status,
        designation: req.body.designation,
        exp: req.body.exp,
        phoneNumber: req.body.phoneNumber,
        joiningStatus: req.body.joiningStatus,
        profileSummery: req.body.profileSummery,
        feedback: req.body.feedback,
        skill_name: req.body.skill_name
    }, { new: true })
        .then(candidate => {
            if (!candidate) {
                return res.status(404).send({
                    message: "candidate not found with id " + req.params.candidateId
                });
            }
            res.send({ message: "candidate updated successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "candidate not found with id " + req.params.candidateId
                });
            }
            return res.status(500).send({
                message: "Error updating candidate with id " + req.params.candidateId
            });
        });
};

// Delete a candidate with the specified candidateId in the request
exports.delete = (req, res) => {
    Candidate.findByIdAndRemove(req.params.candidateId)
        .then(candidate => {
            if (!candidate) {
                return res.status(404).send({
                    message: "candidate not found with id " + req.params.candidateId
                });
            }
            res.send({ message: "candidate deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "candidate not found with id " + req.params.candidateId
                });
            }
            return res.status(500).send({
                message: "Could not delete candidate with id " + req.params.candidateId
            });
        });
};