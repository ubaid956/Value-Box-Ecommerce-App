import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
dotenv.config()

import productRoute from './routes/products.js';
import userRouter from './routes/user.js';

const app = express()
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))

app.use(express.json({ limit: "30mb", extended: true }));
app.use('/product', productRoute)
app.use('/', userRouter)


const CONNECTION_URL = process.env.DATABASE_URL
const PORT = process.env.PORT
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server is Running: ${PORT}`)))
    .catch((error) => { console.log(error.message) })
