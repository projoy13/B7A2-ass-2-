import express, { type Application, type Request, type Response } from 'express'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import config from './config'

const app: Application = express()
const port = 5000

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))


const pool = new Pool({
  connectionString:config.connection_string
})

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("DB init error:", error)
  }
}

//  GET ROUTE
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: "server is running",
    author: "joy"
  })
})

// CREATE USER
app.post('/', async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(
      `
      INSERT INTO users(name, email, password, role)
      VALUES($1,$2,$3,$4)
      RETURNING id, name, email, role, created_at, updated_at
      `,
      [name, email, hashedPassword, role]
    )

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: result.rows[0]
    })

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

// GET ALL USER

app.get('/all',async(req:Request,res:Response)=>{

  console.log("connected")
 try {
   const result=await pool.query(`SELECT * FROM users`);
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
})

// GET SINGEL USER 

app.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    )

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
})

// UPDATE USER
app.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, email, password, role } = req.body

  try {
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
})
// DELETE USERS

app.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING *
      `,
      [id]
    )

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
})

//  START SERVER (with DB init first)
app.listen(config.port, async () => {
  await initDB()
  console.log(`Server is running on ${config.port}`)
})