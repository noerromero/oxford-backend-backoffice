import express from "express";
import { postStudent } from "../controllers/student/student.postcontroller";
import { putStudent } from "../controllers/student/student.putcontroller";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("get students");
});

router.post("/", postStudent);
router.put("/", putStudent);

export default router;
