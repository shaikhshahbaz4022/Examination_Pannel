const express = require('express');
const { connection } = require('./Connection/connection');
require("dotenv").config()
const cors = require('cors');
const PORT = process.env.PORT || 8000
const app = express()
app.use(express.json())
app.use(cors())



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