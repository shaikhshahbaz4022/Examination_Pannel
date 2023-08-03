const express = require('express');

const { userInstructor, alldata } = require('../Controller/Admin.controller');
const { UserAuthenticate } = require('../Middleware/RBAC');

const AdminRouter = express.Router()

AdminRouter.post("/create", UserAuthenticate(["admin"]), userInstructor)

AdminRouter.get("/getalldata", UserAuthenticate(["admin"]), alldata)


module.exports = AdminRouter