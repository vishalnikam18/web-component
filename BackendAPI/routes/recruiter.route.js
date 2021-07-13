module.exports = (app) => {
    const recruiters = require('../controllers/recruiter.controller.js');

    // Create a new recruiters
    app.post('/recruiter', recruiters.create);

    // Retrieve all recruiters
    app.get('/recruiter', recruiters.findAll);

}