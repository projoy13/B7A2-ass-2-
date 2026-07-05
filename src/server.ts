import express, { type Application, type Request, type Response } from 'express'
import {Pool} from "pg";
const app:Application = express()
 const port=5000;
 

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded())

const pool=new Pool({
  connectionString:"postgresql://neondb_owner:npg_nuMNVa8vie2G@ep-wandering-hall-ao87fn9a.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
})


app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    message:"server is running",
    author:"joy"
  })
})

app.post('/',async(req:Request,res)=>{
  
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})