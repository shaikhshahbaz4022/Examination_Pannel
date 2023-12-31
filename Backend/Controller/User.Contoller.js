const UserModel = require("../Model/User.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
    const { name, email, password, role } = req.body
    try {

        const isUserPresent = await UserModel.findOne({ email })
        if (isUserPresent) {
            return res.status(404).send({ msg: "Login Directly , Already Registered" })
        }
        bcrypt.hash(password, 4, async (err, hash) => {
            const user = new UserModel({ name, email, password: hash, role })
            await user.save()
            res.status(201).send({ "msg": "Registration Succesfull" })

        });
    } catch (error) {
        res.status(401).send({ "msg": "Some error occourd while  Registration" })

    }

}
const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (isPasswordMatch) {
                const token = jwt.sign({ userID: user._id, role: user.role }, "privateKey", { expiresIn: '7d' });
                res.status(201).send({ msg: "Login successful", token, userdetails: user });
            } else {
                res.status(401).send({ msg: "Wrong credentials" });
            }
        } else {
            res.status(401).send({ msg: "Login failed, user is not present" });
        }
    } catch (error) {
        res.status(500).send({ msg: "An error occurred while logging in" });
    }
}



module.exports = { Register, Login }