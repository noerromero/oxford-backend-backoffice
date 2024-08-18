import { logger } from "../../../shared/loggin/logger";
import { StudentUpdateRequest } from "../../../src/Student/Application/Update/StudentUpdateRequest";
import { StudentUpdater } from "../../../src/Student/Application/Update/StudentUpdater";
import { MysqlStudentRepository } from "../../../src/Student/Infrastructure/Persistence/Mysql/MysqlStudentRepository";

export const putStudent = async (req: any, res: any) => {
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
    englishCertificate,
    comment,
    legalRepresentative,
  } = req.body;
  const request = new StudentUpdateRequest();
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
  request.englishCertificate = englishCertificate;
  request.comment = comment;
  request.legalRepresentative.name = legalRepresentative.name;
  request.legalRepresentative.surname = legalRepresentative.surname;
  request.legalRepresentative.secondSurname = legalRepresentative.secondSurname;
  request.legalRepresentative.phone = legalRepresentative.phone;
  request.legalRepresentative.cellphone = legalRepresentative.cellphone;

  const studentUpdater = new StudentUpdater(new MysqlStudentRepository());
  try {
    const response = await studentUpdater.run(request);
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
