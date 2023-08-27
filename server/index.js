import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import UserRoutes from "./routes/User.js";
import TaskRoutes from "./routes/Task.js";
import { Register } from "./controllers/User.js";
import tasks from "./data/tasks.js";
import Task from "./models/Task.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    const picturePath =
      new Date().toISOString().replace(/:/g, "-") + file.originalname;
    req.body.picturePath = picturePath;
    cb(null, picturePath);
  },
});

const upload = multer({ storage });

app.use("/auth", UserRoutes);
app.use("/task", TaskRoutes);
app.use("/auth/register", upload.single("picture"), Register);

// Handle errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({ message });
});

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Task.insertMany(tasks);
    app.listen(PORT, () => console.log(`Server Port: ${PORT}!`));
  })
  .catch((error) => console.log(`${error}`));
