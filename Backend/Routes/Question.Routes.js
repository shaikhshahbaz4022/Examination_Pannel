const express = require('express');

const { CreateExam, userQuestion, AllUsers, recent, upcoming } = require('../Controller/Question.Controller');

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






module.exports = QuestionRouter 