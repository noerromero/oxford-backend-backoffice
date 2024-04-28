import { createLogger, transports, format } from "winston";

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    })
  ],
});
