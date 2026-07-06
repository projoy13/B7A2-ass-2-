// import { config } from "dotenv"
import { app } from "./app"
import config from "./config"
import { initDB } from "./db"
// 
 const main=()=>{
    initDB()
    app.listen(config.port, async () => {
  await
  console.log(`Server is running on ${config.port}`)
})
 }
 main()

