import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
import connectToMongoDb from './db/connect.db.js'
import messageRouter from './routes/message.router.js'
import userRoutes from './routes/user.router.js'
import { server, app } from './socket/socket.js'

dotenv.config()

const port = process.env.PORT || 4000

const __dirname = path.resolve()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRouter)
app.use("/api/users", userRoutes)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client", "dist")))

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

server.listen(port, () => {
    connectToMongoDb()
    console.log(`App is listening at http://localhost:${port}`)
})
