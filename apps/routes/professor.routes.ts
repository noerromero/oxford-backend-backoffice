import express from "express";
import { postProfessor } from "../controllers/professor/professor.postcontroller";
import { getAllProfessors } from "../controllers/professor/professor.getcontroller";
import { getByIdProfessor } from "../controllers/professor/professor.getcontroller";
import { putProfessor } from "../controllers/professor/professor.putcontroller";
import { deleteProfessor } from "../controllers/professor/professor.deletecontroller";

const router = express.Router();

router.get("/", getAllProfessors);
router.get("/:id", getByIdProfessor);
router.post("/", postProfessor);
router.put("/", putProfessor);
router.delete("/:id", deleteProfessor);

export default router;