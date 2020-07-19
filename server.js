import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import authRoutes from "./routes/authRoutes";
import budgetsRoutes from "./routes/budgetsRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import {seedData } from './models/categoriesData'


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

seedData

app.use(cors());
app.use(express.json());

//connect to mongoDB
const db = process.env.DB_URL;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log(err));


//use routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/categories", categoriesRoutes);
app.use("/budgets", budgetsRoutes);
app.use("/transactions", transactionRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
