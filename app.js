import dotenv from 'dotenv'
dotenv.config()
import  express  from 'express'
import cors from 'cors';
import connectdb from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'




const app = express()
const port = process.env.PORT 
const DATABASE_URL = process.env.DATABASE_URL

//cors Policy
app.use(cors())

// Database Connection
connectdb(DATABASE_URL)

//JSOn
app.use(express.json()) 


//Load Routes
app.use("/api/user", userRoutes)


app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`)
})