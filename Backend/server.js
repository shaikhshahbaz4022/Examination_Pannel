const express = require('express');
const { connection } = require('./Connection/connection');
require("dotenv").config()
const cors = require('cors');
const { userRouter } = require('./Routes/User.Routes');
const QuestionRouter = require('./Routes/Question.Routes');
const auth = require('./Middleware/Auth');
const PORT = process.env.PORT || 8000
const app = express()
app.use(express.json())
app.use(cors())

app.use("/user", userRouter)
app.use(auth)
app.use("/exam", QuestionRouter)

app.listen(PORT, async () => {
    try {
        await connection
        console.log("Server is Connected to DB Succesfully");
    } catch (error) {
        console.log(error);
        console.log("Error While Connecting To DB");
    }
    console.log(`Server is Connected to Port ${PORT}`);
})
