import bcrypt from "bcryptjs";
import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_role } from "../../TYPES";

export const router=Router()


// create
router.post('/auth/signup',userController.creatUser)
// get all
router.get('/all',auth(USER_role.contributor,USER_role.maintainer),userController.getallUser)
// get single id
router.get('/:id',userController.singleuser)
// update user
router.put('/:id',userController.updateuser)
// delete user
router.delete('/:id',userController.deleteuser)


export default router