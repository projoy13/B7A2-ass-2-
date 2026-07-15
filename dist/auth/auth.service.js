// import { Query } from "pg";
import bcrypt from "bcryptjs";
import { pool } from "../db";
import jwt from "jsonwebtoken";
import config from "../config";
// import { config } from "dotenv";
const loginUserIntoBD = async (payload) => {
    const { email, password } = payload;
    const userData = await pool.query(`
        SELECT * FROM users
        WHERE email=$1
        `, [email]);
    if (userData.rows.length === 0) {
        throw new Error("Invalid credential");
    }
    const user = userData.rows[0];
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        throw new Error("Invalid credentials");
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    const accessToken = jwt.sign(jwtPayload, config.secret, {
        expiresIn: "1d"
    });
    const refreshToken = jwt.sign(jwtPayload, config.secret, {
        expiresIn: "1d"
    });
    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at
        }
    };
};
// const generateFreshToken = async (token: string) => {
//     if (!token) {
//         throw new Error("Unauthorized");
//     }
//     const decoded = jwt.verify(
//         token,
//         config.secret as string
//     ) as {
//         email: string;
//     };
//     const userData = await pool.query(
//         `
//         SELECT * FROM users
//         WHERE email = $1
//         `,
//         [decoded.email]
//     );
//     if (userData.rows.length === 0) {
//         throw new Error("User not found");
//     }
//     const user = userData.rows[0];
//     const jwtPayload = {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//     };
//     const accessToken = jwt.sign(
//         jwtPayload,
//         config.secret as string,
//         {
//             expiresIn: "15m"
//         }
//     );
//     return {
//         accessToken
//     };
// };
export const authservice = {
    loginUserIntoBD,
    // generateFreshToken
};
//# sourceMappingURL=auth.service.js.map