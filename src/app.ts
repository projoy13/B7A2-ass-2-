


 import express, { type Application, type Request, type Response } from 'express'

import { initDB, pool } from './db'

import router from './module/user/user.router'
import issuseRouter from './module/issues/issue.route'
import { authRoute } from './auth/auth.route'
import fs from "fs"
import { log } from 'console'
import logger from './middleware/logger'
export  const app = express()
// const port = 5000

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

// import fs from "fs";

app.use(logger);

 initDB()
//  GET ROUTE
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: "server is running",
    author: "joy"
  })
})


app.use('/api/auth',authRoute)
// CREATE USER
app.use("/api",router)

// GET ALL USER

// app.use('/all',router)

// GET SINGEL USER 

// app.use('/:id', router)

// UPDATE USER
// app.use('/:id',router)
// DELETE USERS

// app.delete('/',router)

//  issue
app.use('/api/issues',issuseRouter)