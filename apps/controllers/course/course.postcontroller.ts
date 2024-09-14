import { logger } from "../../../shared/loggin/logger";
import { CourseCreateRequest } from "../../../src/Course/Application/Create/CourseCreateRequest";
import { CourseCreator } from "../../../src/Course/Application/Create/CourseCreator";
import { MysqlCourseRepository } from "../../../src/Course/Infrastructure/MysqlCourseRepository";

export const postCourse = async (req: any, res: any) => {
    const {
      id,
      name,
      description,
    } = req.body;
    const request = new CourseCreateRequest();
    request.id = id;
    request.name = name;
    request.description = description;
  
    const courseCreator = new CourseCreator(new MysqlCourseRepository());
    try {
      const response = await courseCreator.run(request);
      if (!response.success) {
        return res.status(400).json(response);
      }
      return res.status(201).json(response);
    } catch (e) {
      logger.log("error", `${e}`);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };