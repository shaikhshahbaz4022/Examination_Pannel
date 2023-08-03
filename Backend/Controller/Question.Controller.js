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

const userQuestion = async (req, res) => { // for user 1.point
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
//-------> User Routes 
//-------> Recent Exam/previous


const recent = async (req, res) => {
    try {
        const userId = req.userID;
        const user = await UserModel.findById(userId).populate('clearedExams');
        res.status(200).json(user.clearedExams);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


const upcoming = async (req, res) => {
    try {
        const userId = req.userID;
        const user = await UserModel.findById(userId).populate('upcomingExams');
        // const now = new Date();
        // console.log(now)
        // .filter((exam) => exam.startTime > now);
        const upcomingExams = user.upcomingExams

        res.status(200).json(upcomingExams);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


// Route: POST /api/exams/:examId/submit
// Submit an exam by the User and update clearedExams

const submit = async (req, res) => {
    try {
        const { examId } = req.params;
        const userId = req.userID;

        const user = await UserModel.findById(userId);
        const exam = await ExamModel.findById(examId);

        if (!user || !exam) {
            return res.status(404).json({ msg: 'User or Exam not found' });
        }


        user.clearedExams.push(examId);
        await user.save();

        res.status(200).json({ msg: 'Exam submitted successfully' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Route: POST /api/exams/:examId/assign/:studentId
// Assign an exam to a specific user 
const assigned = async (req, res) => {
    try {
        const { examId, studentId } = req.params;
        const exam = await ExamModel.findById(examId);
        const user = await UserModel.findById(studentId);

        if (!exam || !user) {
            return res.status(404).json({ error: 'Exam or User not found' });
        }

        // adding to upcomingexan and assignedto array.....
        user.upcomingExams.push(examId)
        await user.save()
        exam.assignedTo = studentId;
        await exam.save();



        res.status(200).json({ msg: 'Exam assigned successfully' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
module.exports = { CreateExam, userQuestion, AllUsers, recent, upcoming, submit, assigned }