import { Router } from "express";
import { issueController } from "./issue.controller";
import auth from "../../middleware/auth";
import { USER_role } from "../../TYPES";

const issueRouter=Router()
// CREAT ISSUE
issueRouter.post('/',auth(USER_role.contributor,USER_role.maintainer),issueController.creatissue)

// GET ALL ISSUE
issueRouter.get('/all',issueController.getAllissue)
// /api/issues?sort=newest
// GET SINGLE ISSUE
issueRouter.get('/:id',auth(USER_role.contributor,USER_role.maintainer),issueController.getsingleissue)
// update issue
issueRouter.put('/:id',issueController.updateissue)
// delete issue
issueRouter.delete('/:id',auth(USER_role.maintainer),issueController.deleteissue)


export default issueRouter