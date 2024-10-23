import express from 'express'
import appRoutes from './routes/index.js'
import 'dotenv/config'

const app = express()

app.use(express.json())

app.use(appRoutes)

app.listen(process.env.PORT,()=>console.log("Server is listening"))