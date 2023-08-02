const express = require('express');

const { CreateExam, userQuestion, AllUsers } = require('../Controller/Question.Controller');
const ExamModel = require('../Model/Question.Model');
const { UserAuthenticate } = require('../Middleware/RBAC');
const QuestionRouter = express.Router()

QuestionRouter.post("/create", CreateExam)
QuestionRouter.get("/userquestion", userQuestion)

QuestionRouter.get("/allusers", UserAuthenticate(["instructor", "admin"]), AllUsers)
module.exports = QuestionRouter 