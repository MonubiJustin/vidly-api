const logger = require('../logger/logger')

module.exports = function (err, req, res, next) {
    logger.error(err.message);

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    
    res.status(500).send("Something went wrong")
}