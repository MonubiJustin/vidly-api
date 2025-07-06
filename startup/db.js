const mongoose = require('mongoose');
const logger = require('../logger/logger')


module.exports = function () {
    const db = process.env.DB_URI
    
    mongoose.connect(db, {
        serverSelectionTimeoutMS: 5000
    })
        .then(() => logger.info(`Connected to ${db}...`))
}