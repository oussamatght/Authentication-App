const origins = require('./alloworigins');
const allowCORS = {
    origin: (origin, callback) => {
        if (origins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200,
}
module.exports = allowCORS