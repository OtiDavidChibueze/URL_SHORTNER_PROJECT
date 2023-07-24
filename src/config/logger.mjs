// LOGGER CONFIG
import { createLogger, format, transports } from 'winston'

const logger = createLogger({

    format: format.combine(format.json(), format.errors({ stack: true }), format.timestamp({ format: 'ddd MM YYYY' }), format.splat(), format.printf(({ level, timestamp, message }) => {
        return `[${level.toUpperCase()}] : [${timestamp}] : ${message}`
    })),

    transports: [
        new transports.Console({ format: format.combine(format.colorize(), format.simple()) }),
        new transports.File({ filename: 'appDevelopment.log' })
    ],

    exceptionHandlers: [
        new transports.File({ filename: 'errorDevelopment.log' })
    ],

    exitOnError: false

})


export default logger;

