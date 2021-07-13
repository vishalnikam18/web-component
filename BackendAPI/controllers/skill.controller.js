const skill = require('../models/skill');


// Get the skills from database
exports.findAll = (req, res) => {
    skill.find()
        .then(skill => {
            res.send(skill);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving skills."
            });
        });
};