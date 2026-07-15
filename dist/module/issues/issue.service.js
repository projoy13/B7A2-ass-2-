import { pool } from "../../db";
const creatissueIntoBD = async (payload) => {
    const { id, title, description, type, status, reporter_id } = payload;
    const user = await pool.query(`
        SELECT * FROM users 
        WHERE id=$1
        
        `, [reporter_id]);
    if (user.rows.length === 0) {
        throw new Error('user not found');
    }
    const result = await pool.query(`
    INSERT INTO issues(reporter_id,title,description,type,status)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *
    `, [reporter_id, title, description, type, status ?? "open"]);
    return result.rows[0];
};
const getALlissueIntoBD = async () => {
    const result = await pool.query(`
        SELECT
            issues.id,
            issues.title,
            issues.description,
            issues.type,
            issues.status,
            json_build_object(
                'id', users.id,
                'name', users.name,
                'role', users.role
            ) AS reporter,
            issues.created_at,
            issues.updated_at
        FROM issues
        JOIN users
        ON issues.reporter_id = users.id
        ORDER BY issues.created_at DESC
    `);
    return result;
};
const getSingleIssueIntoBD = async (id) => {
    const result = await pool.query(`
        SELECT
            issues.id,
            issues.title,
            issues.description,
            issues.type,
            issues.status,
            json_build_object(
                'id', users.id,
                'name', users.name,
                'role', users.role
            ) AS reporter,
            issues.created_at,
            issues.updated_at
        FROM issues
        JOIN users
        ON issues.reporter_id = users.id
        WHERE issues.id = $1
        `, [id]);
    return result;
};
const updateIssueIntoBD = async (id, payload) => {
    const { title, description, type, status } = payload;
    const result = await pool.query(`
        UPDATE issues
        SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            type = COALESCE($3, type),
            status = COALESCE($4, status),
            updated_at = NOW()
        WHERE id = $5
        RETURNING *
        `, [title, description, type, status, id]);
    return result;
};
const deleteIssueIntoBD = async (id) => {
    const result = await pool.query(`
        DELETE FROM issues
        WHERE id = $1
        RETURNING *
        `, [id]);
    return result;
};
export const issueservice = {
    creatissueIntoBD,
    getALlissueIntoBD,
    getSingleIssueIntoBD,
    updateIssueIntoBD,
    deleteIssueIntoBD
};
//# sourceMappingURL=issue.service.js.map