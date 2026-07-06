import bcrypt from "bcryptjs";
import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";

const router=Router()
// create
router.post('/',userController.creatUser)
// get all
router.get('/all',userController.getallUser)
// get single id
router.get('/:id',userController.singleuser)
// update user
router.put("/:id",userController.updateuser)
// delete user
router.delete('/:id',userController.deleteuser)


export default router