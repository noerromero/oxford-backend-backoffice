import { ProfessorSearcherAll } from "../../../src/Professor/Application/Search/ProfessorSearcherAll";
import { MysqlProfessorRepository } from "../../../src/Professor/Infrastructure/MysqlProfessorRepository";
import { logger } from "../../../shared/loggin/logger";
import { ProfessorSearcherById } from "../../../src/Professor/Application/Search/ProfessorSearcherById";

export const getByIdProfessor= async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const professorSearcher = new ProfessorSearcherById(
      new MysqlProfessorRepository()
    );
    const response = await professorSearcher.run(id);
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

export const getAllProfessors = async (req: any, res: any) => {
    try {
      const professorSearcher = new ProfessorSearcherAll(new MysqlProfessorRepository());
      const response = await professorSearcher.run();
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