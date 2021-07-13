module.exports = (app) => {
    const candidates = require('../controllers/candidate.controller.js');

    // Create a new candidate
    app.post('/candidate', candidates.create);

    // Retrieve all candidates
    app.get('/candidate', candidates.findAll);

    // Retrieve a single candidate with candidateId
    app.get('/candidate/:candidateId', candidates.findOne);

    app.get('/interviewer', candidates.findInterviewer);

    // filter list based on candidate details
    app.get("/candidateListBasedOnFilter/", candidates.findBasedOnFilter);

    // Update a candidate with candidateId
    app.put('/candidate/:candidateId', candidates.update);

    // Delete a candidate with candidateId
    app.delete('/candidate/:candidateId', candidates.delete);

    app.get('/can', candidates.demo);

}

