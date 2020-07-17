import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'
import categoriesRoutes from './routes/categoriesRoutes'
import authRoutes from './routes/authRoutes'
import budgetsRoutes from './routes/budgetsRoutes'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

dotenv.config()

const db = process.env.DB_URL
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err))

//use routes
app.use("/users", userRoutes)
app.use("/auth", authRoutes)
app.use('/categories', categoriesRoutes)
app.use("/budgets", budgetsRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
