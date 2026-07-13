import type { Request, Response } from "express";
import { issueservice } from "./issue.service";

const creatissue=async(req:Request,res:Response)=>{

try {
    const result=await issueservice.creatissueIntoBD(req.body)
    res.status(201).json({
        success:true,
        message:'issue created sucessfully',
        data:result
    })
} catch (error:any) {
    res.status(500).json({
        success:false,
        message:"failed to creat issue",
        error:error
    })
}

}

const getAllissue=async(req:Request,res:Response)=>{

    try {
        const result=await issueservice.getALlissueIntoBD()
        res.status(200).json({
            success:true,
            message:'all issue found successfully',
            data:result.rows
        })
        
    } catch (error:any) {
        res.status(500).json({
        success:false,
        message:"failed to get ll issue",
        error:error
    })
    }
}
const getsingleissue=async(req:Request,res:Response)=>{
    const {id} = req.params
    try {
        const result=await issueservice.getSingleIssueIntoBD(id as string)
     
         if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: {}
      })
    }
            

        res.status(200).json({
            success:true,
            message:'user retrived suceessfully',
            data:result.rows[0]
        })
        
    } catch (error:any) {
        res.status(500).json({
        success:false,
        message:"failed to get single issue",
        error:error
    })
    }
}
const updateissue=async(req:Request,res:Response)=>{
const {id} = req.params
    try {
        const result=await issueservice.getSingleIssueIntoBD(id as string)
     
         if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: {}
      })
    }
            

        res.status(200).json({
            success:true,
            message:'user updated suceessfully',
            data:result.rows[0]
        })
        
    } catch (error:any) {
        res.status(500).json({
        success:false,
        message:"failed to update single issue",
        error:error
    })
    }



}
const deleteissue=async(req:Request,res:Response)=>{
    const {id} = req.params;
    try {
        const result=await issueservice.getSingleIssueIntoBD(id as string)
     
         if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: {}
      })
    }
            

        res.status(200).json({
            success:true,
            message:'user deleted successfully suceessfully',
            data:result.rows[0]
        })
        
    } catch (error:any) {
        res.status(500).json({
        success:false,
        message:"failed to delete single issue",
        error:error
    })
    }

}
export const issueController={
    creatissue,
    getAllissue,
    getsingleissue,
   updateissue,
   deleteissue
}