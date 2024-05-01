import { createLogger, transports, format } from "winston";

const date = new Date();
const year = date.getFullYear();
const month = `0${date.getMonth() + 1}`.slice(-2);
const day = `0${date.getDate()}`.slice(-2);

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: `logs/error${year}${month}${day}.log`,
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
