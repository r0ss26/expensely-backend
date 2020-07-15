import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
