import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import orderRoutes from './routes/orderRoutes.js'
import cookieParser from "cookie-parser";
import paymentRoutes from "./routes/paymentRoutes.js";

const port = process.env.PORT || 5000;
const url = process.env.MONGO_URL;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // or your frontend domain
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders" , orderRoutes)
app.use("/api/payment", paymentRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.code || 500).json({ message: err.message || "Unkown error occured." });
});

mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
