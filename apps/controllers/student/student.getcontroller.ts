import { logger } from "../../../shared/loggin/logger";
import { StudentSearcherById } from "../../../src/Student/Application/Search/StudentSearcherById";
import { MysqlStudentRepository } from "../../../src/Student/Infrastructure/Persistence/Mysql/MysqlStudentRepository";

export const getByIdStuent = async (req: any, res: any) => {
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
