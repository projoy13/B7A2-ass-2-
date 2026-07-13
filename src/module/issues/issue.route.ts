import { Router } from "express";
import { issueController } from "./issue.controller";

const issueRouter=Router()
// CREAT ISSUE
issueRouter.post('/',issueController.creatissue)

// GET ALL ISSUE
issueRouter.get('/all',issueController.getAllissue)

// GET SINGLE ISSUE
issueRouter.get('/:id',issueController.getsingleissue)
// update issue
issueRouter.put('/:id',issueController.updateissue)
// delete issue
issueRouter.delete('/:id',issueController.deleteissue)


export default issueRouter