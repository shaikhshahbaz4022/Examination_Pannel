const UserModel = require("../Model/User.model");
const bcrypt = require('bcrypt');


const userInstructor = async (req, res) => {
    const { name, email, password, role } = req.body
    try {

        bcrypt.hash(password, 4, async (err, hash) => {
            const user = new UserModel({ name, email, password: hash, role })
            console.log(user);
            await user.save()
            res.status(201).json({ "msg": `${user.role} Created Succesfully` })

        });
    } catch (error) {
        res.status(401).json({ msg: error.message })

    }
}
const alldata = async (req, res) => {
    try {
        const alldata = await UserModel.find().populate("clearedExams")
        res.status(200).json(alldata)
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = { userInstructor, alldata }