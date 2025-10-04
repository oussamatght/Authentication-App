const mongoose = require('mongoose');
require('dotenv').config()
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
const schema = mongoose.Schema
const userSchema = new schema({
    name: String,
    email: String,
    password: String
})
const User = mongoose.model('user', userSchema)
module.exports = connectDB
module.exports.User = User