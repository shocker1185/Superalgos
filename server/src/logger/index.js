import { createLogger, format, transports } from 'winston'
import { inspect } from 'util'

const { combine, timestamp, simple } = format

const options = {
  file: {
    level: 'info',
    filename: '../logs/app.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
  }
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
          format.colorize(),
          format.timestamp({ format: 'YY/MM/DD HH:mm' }),
          format.printf(
            info => `${info.timestamp} - ${info.level}: ${JSON.parse(JSON.stringify(inspect(info.message)))}`
          )
  ),
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
})

export default logger
