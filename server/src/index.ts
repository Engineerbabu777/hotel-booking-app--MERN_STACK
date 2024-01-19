import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';

const app = express()
dotenv.config()

// CONNECT TO DATABASE!
mongoose.connect(process.env.MONGO_URI as string)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.listen(4444, () => {
  console.log('Sever is running on Port: 4444')
})
