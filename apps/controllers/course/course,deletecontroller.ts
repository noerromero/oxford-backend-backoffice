import { logger } from "../../../shared/loggin/logger";
import { CourseRemover } from "../../../src/Course/Application/Delete/CourseRemover";
import { MysqlCourseRepository } from "../../../src/Course/Infrastructure/MysqlCourseRepository";

export const deleteCourse= async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const courseSearcher = new CourseRemover(
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