import fs from "fs";
const logger = (req, res, next) => {
    const message = `${new Date().toISOString()} - ${req.method} - ${req.originalUrl}\n`;
    console.log(message);
    fs.appendFile("logger.txt", message, (err) => {
        if (err) {
            console.error(err);
        }
    });
    next();
};
export default logger;
//# sourceMappingURL=logger.js.map