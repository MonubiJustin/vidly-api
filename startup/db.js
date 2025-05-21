const mongoose = require('mongoose');
const logger = require('../logger/logger')
const config = require('config')

module.exports = function () {
    // const db = config.get('db')
    
    mongoose.connect('mongodb+srv://michelle:zxcqwe123@cluster0.eo6fuyv.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0', {
        serverSelectionTimeoutMS: 5000
    })
        .then(() => logger.info(`Connected to db...`))
}