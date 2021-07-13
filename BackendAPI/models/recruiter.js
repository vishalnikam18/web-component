const mongoose = require('mongoose');

const RecruiterSchema = mongoose.Schema({
    EmployeeId: Number,
    Name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('recruiter', RecruiterSchema);