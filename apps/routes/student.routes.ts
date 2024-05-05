import express from "express";
import { postStudent } from "../controllers/student/student.postcontroller";
import { putStudent } from "../controllers/student/student.putcontroller";
import { getByIdStuent } from "../controllers/student/student.getcontroller";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("get students");
});

router.get("/:id", getByIdStuent);
router.post("/", postStudent);
router.put("/", putStudent);

export default router;
