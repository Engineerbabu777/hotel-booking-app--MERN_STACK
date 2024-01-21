import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import { v2 as cloudinary } from 'cloudinary'
import cookieParser from 'cookie-parser'
import path from 'path'
// CREATING EXPRESS APP!!
const app = express()
dotenv.config() // FOR USING ***** !

// CONNECT TO DATABASE!
mongoose.connect(process.env.MONGO_URI as string)

// CLOUD_NARY CONFIG!
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// NECESSARY MIDDLEWARES!!
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../../client/build')))

// ROUTES!!
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// LISTENING ON SERVER 4444!!
app.listen(4444, () => {
  console.log('Sever is running on Port: 4444')
})
