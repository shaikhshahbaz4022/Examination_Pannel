const express = require('express');

const { CreateExam, userQuestion, AllUsers, recent, upcoming, submit, assigned } = require('../Controller/Question.Controller');

const { UserAuthenticate } = require('../Middleware/RBAC');
const QuestionRouter = express.Router()

QuestionRouter.post("/create", CreateExam)
QuestionRouter.get("/userquestion", userQuestion)

QuestionRouter.get("/allusers", UserAuthenticate(["instructor", "admin"]), AllUsers)
//users 

//---> previous exam
QuestionRouter.get("/recent", recent)
//---->upcoming exams of user
QuestionRouter.get("/upcoming", upcoming)


// Route: POST /exam/exams/:examId/submit
// Submit an exam by the User and update clearedExams

QuestionRouter.post('/exams/:examId/submit', submit);

// Route: POST /exam/exams/:examId/assign/:studentId
// Assign an exam to a specific user 
QuestionRouter.post('/exams/:examId/assign/:studentId', assigned)


module.exports = QuestionRouter 