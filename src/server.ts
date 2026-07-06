import express, { type Application, type Request, type Response } from 'express'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const app: Application = express()
const port = 5000

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))


const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_nuMNVa8vie2G@ep-wandering-hall-ao87fn9a.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
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

// ✅ START SERVER (with DB init first)
app.listen(port, async () => {
  await initDB()
  console.log(`Server is running on ${port}`)
})