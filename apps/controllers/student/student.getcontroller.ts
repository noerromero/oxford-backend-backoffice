import { logger } from "../../../shared/loggin/logger";
import { StudentSearcherById } from "../../../src/Student/Application/Search/StudentSearcherById";
import { StudentSearcherAll } from "../../../src/Student/Application/Search/StudentSearcherAll";
import { MysqlStudentRepository } from "../../../src/Student/Infrastructure/Persistence/Mysql/MysqlStudentRepository";

export const getByIdStudent = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const studentSearcher = new StudentSearcherById(
      new MysqlStudentRepository()
    );
    const response = await studentSearcher.run(id);
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

export const getAllStudents = async (req: any, res: any) => {
  try {
    const studentSearcher = new StudentSearcherAll(new MysqlStudentRepository());
    const response = await studentSearcher.run();
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
