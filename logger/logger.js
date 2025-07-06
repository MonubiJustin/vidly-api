const winston = require('winston');
require('winston-mongodb');


const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}),
        winston.format.json(),
        winston.format.errors({ stack: true }),
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            )
        }),

        new winston.transports.File({
            filename: 'logs/log.log'
        }),

        new winston.transports.MongoDB({
            db: 'mongodb://localhost/vidly', // enter the data base name,
            collection: 'logs',
            level: 'info'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'logs/exceptions.log'
        }),
        // new winston.transports.Console({
        //     format: winston.format.combine(
        //       winston.format.colorize(),
        //       winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
        //       winston.format.printf(({ level, message, timestamp }) => {
        //         return `${timestamp} ${level}: ${message}`;
        //       })
        //     )
        //   })
    ],

    rejectionHandlers: [
        new winston.transports.File({
            filename: 'logs/rejections.log'
        })
    ]
})

module.exports = logger;