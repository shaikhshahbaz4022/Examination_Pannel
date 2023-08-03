const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    question: { type: String },
    answer: { type: String, default: "" },
    isRight: { type: Boolean, default: false },

});



const examSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [questionSchema],
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    status: { type: String, enum: ['upcoming', 'completed'], default: 'upcoming' },
    startTime: { type: Date },
    endTime: { type: Date },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    score: { type: Number, default: 0 }

});

const ExamModel = mongoose.model('exam', examSchema);



module.exports = ExamModel;
