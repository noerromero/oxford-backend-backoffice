import express from "express";
import { postStudent } from "../controllers/student/student.postcontroller";
import { putStudent } from "../controllers/student/student.putcontroller";
import { getByIdStudent } from "../controllers/student/student.getcontroller";
import { getAllStudents } from "../controllers/student/student.getcontroller";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/:id", getByIdStudent);
router.post("/", postStudent);
router.put("/", putStudent);

export default router;
