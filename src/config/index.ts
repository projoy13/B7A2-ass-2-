// import { configDotenv } from "dotenv";
import path from "path";
import dotenv from"dotenv"
dotenv.config({
    path:path.join(process.cwd(),'.env')
})
const config={
    connection_string:process.env.CONNECTIONSTRING as string,
     port:process.env.PORT,
     secret:process.env.JWT_SECRET,
     refresh_token:process.env.JWT_REFRESH_SECRET
}
// console.log(config)
export default config