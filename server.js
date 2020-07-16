import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import budgetCategoriesRoutes from './routes/budgetCategoryRoutes'
import auth from './middleware/auth'
import expressValidator from 'express-validator'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(expressValidator())

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
app.use("/budgetCategories", auth, budgetCategoriesRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
