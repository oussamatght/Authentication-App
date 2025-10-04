const express = require("express")
const router = express.Router()
const path = require("path")
const authcontroller = require("../controllers/authcontroller")

router.route("/register")
    .post(authcontroller.register)
router.route("/login")
    .post(authcontroller.login)

module.exports = router