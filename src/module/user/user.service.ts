import bcrypt from "bcryptjs"
import { pool } from "../../db"
import type { Iuser } from "./user.interface"

const creatuserintoBD=async(payload:Iuser)=>{
     const { name, email, password, role } = payload
      const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(
      `
      INSERT INTO users(name, email, password, role)
      VALUES($1,$2,$3,$4)
      RETURNING id, name, email, role, created_at, updated_at
      `,
      [name, email, hashedPassword, role]
    )
    return result.rows[0]
}
const getalluserFromBD=async()=>{
    const result=await pool.query(`SELECT * FROM users`);
    return result
}
const getsingleuserFromBD=async(id:string)=>{
     
const result = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    )
    return result
}
const updateuserFromBD=async(payload:Iuser,id:string)=>{
      const { name, email, password, role } = payload
     const result = await pool.query(
      `
      UPDATE users
      SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        role = COALESCE($4, role),
        updated_at = NOW()
      WHERE id = $5
      RETURNING *
      `,
      [name, email, password, role, id]
    )
    return result
}
const deleteuserFromBD=async(id:string)=>{
     const result = await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING *
      `,
      [id]
    )
    return result
}

export const userService={
    creatuserintoBD,
    getalluserFromBD,
    getsingleuserFromBD,
    updateuserFromBD,
    deleteuserFromBD
}
