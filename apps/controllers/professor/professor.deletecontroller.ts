import { ProfessorRemover } from "../../../src/Professor/Application/Delete/ProfessorRemover";
import { MysqlProfessorRepository } from "../../../src/Professor/Infrastructure/MysqlProfessorRepository";
import { logger } from "../../../shared/loggin/logger";

export const deleteProfessor= async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const professorSearcher = new ProfessorRemover(
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