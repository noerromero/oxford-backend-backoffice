import { ProfessorCreateRequest } from "../../../src/Professor/Application/Create/ProfessorCreateRequest";
import { ProfessorCreator } from "../../../src/Professor/Application/Create/ProfessorCreator";
import { MysqlProfessorRepository } from "../../../src/Professor/Infrastructure/MysqlProfessorRepository";
import { logger } from "../../../shared/loggin/logger";

export const postProfessor = async (req: any, res: any) => {
    const {
      id,
      dni,
      name,
      surname,
      secondSurname,
      email,
      birthday,
      cellphone,
    } = req.body;
    const request = new ProfessorCreateRequest();
    request.id = id;
    request.dni = dni;
    request.name = name;
    request.surname = surname;
    request.secondSurname = secondSurname;
    request.email = email;
    request.birthday = birthday;
    request.cellphone = cellphone;
  
    const professorCreator = new ProfessorCreator(new MysqlProfessorRepository());
    try {
      const response = await professorCreator.run(request);
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
  