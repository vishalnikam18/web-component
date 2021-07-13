const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const CandidateSchema = mongoose.Schema({
	interviewType: String,
	candidateName: String,
	project: String,
	recruiterName: String,
	interviewDate: Date,
	interviewRound: String,
	interviewMode: String,
	interviewer: String,
	status: String,
	designation: String,
	exp: String,
	phoneNumber: String,
	joiningStatus: String,
	profileSummery: String,
	feedback: String,
	flag: Boolean,
	email: String,
	skill_name: Array
}, {
	timestamps: true
});

autoIncrement.initialize(mongoose.connection);

CandidateSchema.plugin(autoIncrement.plugin, 'candidate');
module.exports = mongoose.model('candidate', CandidateSchema);
