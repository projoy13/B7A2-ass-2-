


 import express, { type Application, type Request, type Response } from 'express'

import { initDB, pool } from './db'

import router from './module/user/user.router'

export  const app = express()
// const port = 5000

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))



 initDB()
//  GET ROUTE
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: "server is running",
    author: "joy"
  })
})

// CREATE USER
app.use("/api/user",router)

// GET ALL USER

// app.use('/all',router)

// GET SINGEL USER 

// app.use('/:id', router)

// UPDATE USER
// app.use('/:id',router)
// DELETE USERS

// app.delete('/',router)

//  START SERVER (with DB init first)
