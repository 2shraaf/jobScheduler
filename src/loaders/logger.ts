import winston from 'winston';

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.cli(),
      winston.format.splat()
    ),
  }),

  // new winston.transports.File({
  //   filename: 'debug.log',
  //   format: winston.format.combine(
  //     winston.format.cli(),
  //     winston.format.splat()
  //   ),
  // }),
];
const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports,
});

export default logger;
