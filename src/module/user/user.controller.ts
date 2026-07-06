import bcrypt from "bcryptjs"
import type { Request, Response } from "express"
import { pool } from "../../db"
import { userService } from "./user.service"

const creatUser=async (req: Request, res: Response) => {
 

  try {
    // hash password
   
    const result=await userService.creatuserintoBD(req.body)

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: result
    })

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
const getallUser=async(req:Request,res:Response)=>{

  console.log("connected")
 try {
   const result=await userService.getalluserFromBD()
  res.status(200).json({
    success:true,
    message:"user retrieved successfully",
    data:result.rows
  })
  
 } catch (error:any) {
  res.status(500).json({
      success: false,
      message: error.message
    })
 }
}
const singleuser=async (req: Request, res: Response) => {
 
const {id} = req.params
  try {
    const result=await userService.getsingleuserFromBD(id as string)

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: {}
      })
    }

    return res.status(200).json({
      success: true,
      message: "user retrieved successfully",
      data: result.rows[0]
    })

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
const updateuser= async (req: Request, res: Response) => {
  const { id } = req.params
//   const { name, email, password, role } = req.body

  try {
   
 const  result=await userService.updateuserFromBD(req.body,id as string)
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: {}
      })
    }

    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: result.rows[0]
    })

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const deleteuser= async (req: Request, res: Response) => {
  const { id } = req.params

  try {
   const result=await userService.deleteuserFromBD(id as string)

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: {}
      })
    }

    return res.status(200).json({
      success: true,
      message: "user deleted successfully",
      data: result.rows[0]
    })

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
export const userController={
    creatUser,
    getallUser,
    singleuser,
    updateuser,
    deleteuser
}