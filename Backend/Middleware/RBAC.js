const UserAuthenticate = (role) => {
    return (req, res, next) => {
        let inputRole = req.role

        if (role.includes(inputRole)) {
            next()
        } else {
            return res.status(404).send({ "msg": "Unauthorized Person From RBAC" })
        }
    }
}
module.exports = { UserAuthenticate }