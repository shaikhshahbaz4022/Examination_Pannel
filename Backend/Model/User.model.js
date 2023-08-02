const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["Admin", "User", "Instructor"],
        default: "User"
    },


}, {
    versionKey: false
})

const UserModel = mongoose.model("user", userShema)
module.exports = UserModel