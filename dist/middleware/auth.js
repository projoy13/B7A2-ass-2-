import jwt from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "unauthorised"
                });
            }
            const decoded = jwt.verify(token, config.secret);
            console.log(decoded);
            const userData = await pool.query(`
                SELECT * FROM users
                WHERE email=$1
                `, [decoded.email]);
            const user = userData.rows[0];
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "user not found"
                });
            }
            req.user;
            next;
            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "forbidden"
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
export default auth;
//# sourceMappingURL=auth.js.map