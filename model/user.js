const mongoose = require('mongoose')
const schema = mongoose.Schema
const userSchema = new schema({
    name: String,
    lastname: String,
    email: String,
    password: String
})
const User = mongoose.model('userss', userSchema)
module.exports = User