const ExamModel = require("../Model/Question.Model");
const UserModel = require("../Model/User.model");

const CreateExam = async (req, res) => {
    try {
        const { title, questions, assignedTo, startTime, endTime } = req.body;
        const instructor = req.userID;
        if (req.role == "instructor") {
            const exam = new ExamModel({
                title,
                questions,
                assignedTo,
                startTime,
                endTime,
                instructor,
            });
            await exam.save();
            return res.status(201).json(exam);
        } else {
            return res.status(400).json({ msg: "Unauthorized person" })
        }

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}

const userQuestion = async (req, res) => { // for user
    try {
        const UserExam = await ExamModel.find({ assignedTo: req.userID }).populate("assignedTo").populate("instructor")
        res.status(201).json(UserExam)


    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const AllUsers = async (req, res) => {
    try {
        const data = await UserModel.find({ role: "user" })
        return res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = { CreateExam, userQuestion, AllUsers }