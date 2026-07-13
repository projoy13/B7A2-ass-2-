import type { NextFunction, Request, Response } from "express";
import fs from "fs"
const logger=(req:Request, res:Response, next:NextFunction) => {
  const message = `${new Date().toISOString()} - ${req.method} - ${req.originalUrl}\n`;

  console.log(message);

  fs.appendFile("logger.txt", message, (err) => {
    if (err) {
      console.error(err);
    }
  });

  next();
}
export default logger