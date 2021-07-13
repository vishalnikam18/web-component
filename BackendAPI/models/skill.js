const mongoose = require('mongoose');

const SkillScheme = mongoose.Schema({
    skill_name : String
},{
    timestamps : true
});

module.exports = mongoose.model('skill',SkillScheme);