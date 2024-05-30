import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

import authRoutes from './routes/authRoutes.js'
import connectToMongoDb from './db/connect.db.js'
import messageRouter from './routes/message.router.js'
import userRoutes from './routes/user.router.js'

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRouter)
app.use("/api/users", userRoutes)

app.listen(port, () => {{
    connectToMongoDb()
    console.log(`App is lisenting at http://localhost:${port}`);
}})