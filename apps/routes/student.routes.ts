import express from "express";
import { postStudent } from "../controllers/student/student.postcontroller";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("get students");
});

router.post("/", postStudent);

export default router;
