const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "user", "instructor"],
        default: "user"
    },
    clearedExams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'exam' }],
    upcomingExams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'exam' }]


}, {
    versionKey: false
})

const UserModel = mongoose.model("user", userShema)
module.exports = UserModel