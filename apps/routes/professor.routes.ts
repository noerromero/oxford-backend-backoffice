import express from "express";
import { postProfessor } from "../controllers/professor/professor.postcontroller";

const router = express.Router();

//router.get("/", getAllStudents);
//router.get("/:id", getByIdStudent);
router.post("/", postProfessor);
//router.put("/", putStudent);

export default router;