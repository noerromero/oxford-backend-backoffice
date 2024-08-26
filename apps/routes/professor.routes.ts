import express from "express";
import { postProfessor } from "../controllers/professor/professor.postcontroller";
import { getAllProfessors } from "../controllers/professor/professor.getcontroller";
import { getByIdProfessor } from "../controllers/professor/professor.getcontroller";
import { putProfessor } from "../controllers/professor/professor.putcontroller";

const router = express.Router();

router.get("/", getAllProfessors);
router.get("/:id", getByIdProfessor);
router.post("/", postProfessor);
router.put("/", putProfessor);

export default router;