import { logger } from "../../../shared/loggin/logger";
import { CourseSearcherAll } from "../../../src/Course/Application/Search/CourseSearcherAll";
import { CourseSearcherById } from "../../../src/Course/Application/Search/CourseSearcherById";
import { MysqlCourseRepository } from "../../../src/Course/Infrastructure/MysqlCourseRepository";

export const getByIdCourse= async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const courseSearcher = new CourseSearcherById(
        new MysqlCourseRepository()
      );
      const response = await courseSearcher.run(id);
      if (!response.success) {
        return res.status(400).json(response);
      }
      return res.status(200).json(response);
    } catch (e: any) {
      logger.log("error", `${e} stack: ${e.stack}`);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
  
  export const getAllCourses = async (req: any, res: any) => {
      try {
        const courseSearcher = new CourseSearcherAll(new MysqlCourseRepository());
        const response = await courseSearcher.run();
        if (!response.success) {
          return res.status(400).json(response);
        }
        return res.status(200).json(response);
      } catch (e: any) {
        const { request } = req;
        logger.log("error", `${e} stack: ${e.stack}` + request);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    }