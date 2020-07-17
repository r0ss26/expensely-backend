import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import expenseRoutes from './routes/expenseRoutes'
// import expressValidator from 'express-validator'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(expressValidator())

dotenv.config()

const db = process.env.DB_URL
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err))

//use routes
app.use("/users", userRoutes)
app.use("/auth", authRoutes)
app.use("/expense", expenseRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
