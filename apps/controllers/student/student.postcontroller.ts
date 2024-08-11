import { StudentCreateRequest } from "../../../src/Student/Application/Create/StudentCreateRequest";
import { StudentCreator } from "../../../src/Student/Application/Create/StudentCreator";
import { MysqlStudentRepository } from "../../../src/Student/Infrastructure/Persistence/Mysql/MysqlStudentRepository";
import { logger } from "../../../shared/loggin/logger";

export const postStudent = async (req: any, res: any) => {
  const {
    id,
    dni,
    name,
    surname,
    secondSurname,
    email,
    phone,
    birthdate,
    cellphone,
    address,
    academicInstitution,
    workplace,
    englishCertification,
    comment,
    legalRepresentative,
  } = req.body;
  const request = new StudentCreateRequest();
  request.id = id;
  request.dni = dni;
  request.name = name;
  request.surname = surname;
  request.secondSurname = secondSurname;
  request.email = email;
  request.phone = phone;
  request.birthdate = birthdate;
  request.cellphone = cellphone;
  request.address.id = address.id;
  request.address.street = address.street;
  request.address.neighborhood = address.neighborhood;
  request.address.city = address.city;
  request.address.state = address.state;
  request.address.reference = address.reference;
  request.academicInstitution = academicInstitution;
  request.workplace = workplace;
  request.englishCertification = englishCertification;
  request.comment = comment;
  request.legalRepresentative.name = legalRepresentative.name;
  request.legalRepresentative.surname = legalRepresentative.surname;
  request.legalRepresentative.secondSurname = legalRepresentative.secondSurname;
  request.legalRepresentative.phone = legalRepresentative.phone;
  request.legalRepresentative.cellphone = legalRepresentative.cellphone;

  const studentCreator = new StudentCreator(new MysqlStudentRepository());
  try {
    const response = await studentCreator.run(request);
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
