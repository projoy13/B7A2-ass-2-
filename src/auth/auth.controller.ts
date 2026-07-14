import type { Request, Response } from "express";
import { authservice } from "./auth.service";

const loginUser=async(req:Request,res:Response)=>{
    try {
        const result= await authservice.loginUserIntoBD(req.body)
        // const {email,password}=payload;
        const { refreshToken}=result;
        res.cookie("refreshToken",refreshToken,{
            secure:false,
            httpOnly:true,
            sameSite:"lax"
        })

       res.status(200).json({
        success:true,
        message:"login successful",
        data:result
       })

    } catch (error) {
        res.status(500).json({
        success:false,
        message:"failed to login",
        error:error

        }) 
    }
}
// const refreshtoken=async(req:Request,res:Response)=>{
      
//      try {
//         const result= await authservice.generateFreshToken(req.cookies.refreshToken)
//         // const {email,password}=payload;
//         const { refreshToken}=result;
//         res.cookie("refreshToken",refreshToken,{
//             secure:false,
//             httpOnly:true,
//             sameSite:"lax"
//         })

//        res.status(200).json({
//         success:true,
//         message:"login successful",
//         data:result
//        })

//     } catch (error) {
//         res.status(500).json({
//         success:false,
//         message:"failed to login",
//         error:error

//         }) 
//     }


// }
export const authController={
    loginUser,
    // refreshtoken
}