module.exports = (app) => {
    const skill = require('../controllers/skill.controller');


    // Retrieve all skill
    app.get('/skill', skill.findAll);

}