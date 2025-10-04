const express = require("express")
const User = require("../model/user")
const getalluser = async(req, res) => {
    const users = await User.find().select('-password').lean()
    if (users.length === 0) {
        return res.status(400).json({ message: "No users found" })
    }
    res.json(users)
}
module.exports = { getalluser }