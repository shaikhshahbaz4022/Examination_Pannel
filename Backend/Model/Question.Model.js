const mongoose = require('mongoose');


const examSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: { type: Array, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    status: { type: String, enum: ['upcoming', 'completed'], default: 'upcoming' },
    startTime: { type: Date },
    endTime: { type: Date },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },

});

const ExamModel = mongoose.model('Exam', examSchema);

module.exports = ExamModel;
