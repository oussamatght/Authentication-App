const express = require("express")

const router = express.Router()
const Path2D = require("path")
router.get("/", (req, res) => {
    res.sendFile(Path2D.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router