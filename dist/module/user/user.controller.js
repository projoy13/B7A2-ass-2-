import bcrypt from "bcryptjs";
import { pool } from "../../db";
import { userService } from "./user.service";
const creatUser = async (req, res) => {
    try {
        // hash password
        const result = await userService.creatuserintoBD(req.body);
        res.status(201).json({
            success: true,
            message: "user created successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getallUser = async (req, res) => {
    console.log("connected");
    try {
        const result = await userService.getalluserFromBD();
        res.status(200).json({
            success: true,
            message: "user retrieved successfully",
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const singleuser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userService.getsingleuserFromBD(id);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                data: {}
            });
        }
        return res.status(200).json({
            success: true,
            message: "user retrieved successfully",
            data: result.rows[0]
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const updateuser = async (req, res) => {
    const { id } = req.params;
    //   const { name, email, password, role } = req.body
    try {
        const result = await userService.updateuserFromBD(req.body, id);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                data: {}
            });
        }
        return res.status(200).json({
            success: true,
            message: "user updated successfully",
            data: result.rows[0]
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const deleteuser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteuserFromBD(id);
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                data: {}
            });
        }
        return res.status(200).json({
            success: true,
            message: "user deleted successfully",
            data: result.rows[0]
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const userController = {
    creatUser,
    getallUser,
    singleuser,
    updateuser,
    deleteuser
};
//# sourceMappingURL=user.controller.js.map