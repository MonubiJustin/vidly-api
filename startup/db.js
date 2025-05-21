const mongoose = require('mongoose');
const logger = require('../logger/logger')
const config = require('config')

module.exports = function () {
    const db = config.get('db')
    mongoose.connect(db, {
        serverSelectionTimeoutMS: 5000
    })
        .then(() => logger.info(`Connected to ${db}...`))
}