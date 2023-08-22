import express from "express";
import {
  CreateTask,
  GetAllTasks,
  GetTask,
  UpdateTask,
} from "../controllers/Task.js";
import { verifyToken } from "../middleware/Verify.js";

const router = express.Router();

router.post("/create", verifyToken, CreateTask);
router.put("/:id", verifyToken, UpdateTask);
router.get("/:id", verifyToken, GetTask);
router.get("/", verifyToken, GetAllTasks);

export default router;
