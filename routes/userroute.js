const express = require("express")
const router = express.Router()
const userscontroller = require("../controllers/userscontrollers")
router.route("/").get(userscontroller.getalluser)
module.exports = router