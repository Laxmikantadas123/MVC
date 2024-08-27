const express = require("express")
const router = express.Router()
const hbs=require("hbs")
const { handelPostAllUser, handelGetAllUser, handelByIdUser, handelUpdateUser, handelDeleteUser,handelTologin} = require("../controlles/userController")


router
    .route("/")
    .post(handelPostAllUser)
    .get(handelGetAllUser)

router
    .route("/:id")
    .get(handelByIdUser)
    .put(handelUpdateUser)
    .delete(handelDeleteUser)
router
     .route("/login")
     .post(handelTologin)

module.exports = router