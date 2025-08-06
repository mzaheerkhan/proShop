import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path'
import fs from "fs"
dotenv.config();
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import orderRoutes from './routes/orderRoutes.js'
import cookieParser from "cookie-parser";
import paymentRoutes from "./routes/paymentRoutes.js";
import HttpError from "./models/http-error.js";

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
const uploadPath = path.join("uploads", "images");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Created uploads/images folder");
}
app.use("/uploads/images",express.static(path.join("uploads","images")))
app.use((req,res,next)=>{
  throw new HttpError("Could not find this route.",400)
})
app.use((err, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path , (err)=>{
      if(err){
        console.log("Err during deleting file",err)
      }
      else{
        console.log("File deleted Successfully.")
      }
    })
  }
 const status = typeof err.code === 'number' ? err.code : err.status || 500;

res.status(status).json({
  message: err.message || "Unknown error occurred.",
});

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
