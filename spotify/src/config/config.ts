import * as path from "path"
import * as dotenv from "dotenv"

const dotenvPath = path.join(__dirname, "..", "..", ".env")
dotenv.config({ path: dotenvPath })

const port = +process.env.PORT
const host = process.env.HOST
const username = "root"
const password = process.env.PASSWORD
const database = process.env.DATABASE
const jwtSecret = process.env.JWT_SECRET

// console.log(port);
// console.log(host);
// console.log(username);
// console.log(password);
// console.log(database);
// console.log(jwtSecret);

export default {
    port,
    host,
    username,
    password,
    database,
    jwtSecret
}