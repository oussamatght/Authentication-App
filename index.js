require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
app.use(express.json())
const allowCORS = require('./config/allowcors')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(cors(allowCORS))
connectDB()
const path = require('path')

app.use('/auth', require('./routes/authRoutes'))


app.get('/', require('./routes/root'))
app.use('/user', require('./routes/userroute'))


app.use((req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})


mongoose.connection.once('open', () => {
    console.log('connected to mongoDB')
    app.listen(process.env.PORT, () => {
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
mongoose.connection.on("error", (err) => {
    console.log(err);
})