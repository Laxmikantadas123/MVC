const jwt = require("jsonwebtoken")
const Models = require("../models/user")
const auth = async function (req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, "laxmiweabsidas")
        const user = await Models.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log(token);

        if (!user) {
            throw new Error("user is not valid")
        }
        req.user = user
        next()
    } catch (e) {
        res.status(401).send("authontication not valid")
    }

}
module.exports = auth