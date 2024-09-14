import express from "express";
import { deleteCourse } from "../controllers/course/course,deletecontroller";
import { putCourse } from "../controllers/course/course.putcontroller";
import { postCourse } from "../controllers/course/course.postcontroller";
import { getAllCourses, getByIdCourse } from "../controllers/course/course.getcontroller";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getByIdCourse);
router.post("/", postCourse);
router.put("/", putCourse);
router.delete("/:id", deleteCourse);

export default router;