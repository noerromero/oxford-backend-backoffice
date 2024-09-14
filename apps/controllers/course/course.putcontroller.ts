import { logger } from "../../../shared/loggin/logger";
import { CourseUpdater } from "../../../src/Course/Application/Update/CourseUpdater";
import { CourseUpdateRequest } from "../../../src/Course/Application/Update/CourseUpdateRequest";
import { MysqlCourseRepository } from "../../../src/Course/Infrastructure/MysqlCourseRepository";

export const putCourse = async (req: any, res: any) => {
    const {
      id,
      name,
      description,
    } = req.body;
    const request = new CourseUpdateRequest();
    request.id = id;
    request.name = name;
    request.description = description;
  
    const courseUpdater = new CourseUpdater(new MysqlCourseRepository());
    try {
      const response = await courseUpdater.run(request);
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