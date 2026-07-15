import { issueservice } from "./issue.service";
const creatissue = async (req, res) => {
    try {
        const result = await issueservice.creatissueIntoBD(req.body);
        res.status(201).json({
            success: true,
            message: 'issue created sucessfully',
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to creat issue",
            error: error.message
        });
    }
};
const getAllissue = async (req, res) => {
    try {
        const result = await issueservice.getALlissueIntoBD();
        res.status(200).json({
            success: true,
            message: 'all issue found successfully',
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to get ll issue",
            error: error
        });
    }
};
const getsingleissue = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await issueservice.getSingleIssueIntoBD(id);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                data: {}
            });
        }
        res.status(200).json({
            success: true,
            message: 'user retrived suceessfully',
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to get single issue",
            error: error
        });
    }
};
const updateissue = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await issueservice.getSingleIssueIntoBD(id);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                data: {}
            });
        }
        res.status(200).json({
            success: true,
            message: 'user updated suceessfully',
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to update single issue",
            error: error
        });
    }
};
const deleteissue = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await issueservice.getSingleIssueIntoBD(id);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                data: {}
            });
        }
        res.status(200).json({
            success: true,
            message: 'user deleted successfully suceessfully',
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to delete single issue",
            error: error
        });
    }
};
export const issueController = {
    creatissue,
    getAllissue,
    getsingleissue,
    updateissue,
    deleteissue
};
//# sourceMappingURL=issue.controller.js.map