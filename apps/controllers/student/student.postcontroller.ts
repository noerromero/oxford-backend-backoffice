import { StudentCreateRequest } from "../../../src/Student/Application/Dto/StudentCreateRequest";
import { StudentCreator } from "../../../src/Student/Application/StudentCreator";
import { MysqlStudentRepository } from "../../../src/Student/Infrastructure/Persistence/Mysql/MysqlStudentRepository";
import { logger } from "../../../shared/loggin/logger";

export const postStudent = async (req: any, res: any) => {
  const {
    studentId,
    studentDni,
    studentName,
    studentSurname,
    studentSecondSurname,
    studentEmail,
    studentPhone,
    studentBirthdate,
    studentCellphone,
    address,
    studentAcademicInstitution,
    studentWorkplace,
    studentIsOtherEnglishCertification,
    studentEnglishCertification,
    studentComment,
    legalRepresentative,
  } = req.body;
  const request = new StudentCreateRequest();
  request.studentId = studentId;
  request.studentDni = studentDni;
  request.studentName = studentName;
  request.studentSurname = studentSurname;
  request.studentSecondSurname = studentSecondSurname;
  request.studentEmail = studentEmail;
  request.studentPhone = studentPhone;
  request.studentBirthdate = studentBirthdate;
  request.studentCellphone = studentCellphone;
  request.address.id = address.id;
  request.address.street = address.street;
  request.address.neighborhood = address.neighborhood;
  request.address.city = address.city;
  request.address.state = address.state;
  request.address.reference = address.reference;
  request.studentAcademicInstitution = studentAcademicInstitution;
  request.studentWorkplace = studentWorkplace;
  request.studentIsOtherEnglishCertification =
    studentIsOtherEnglishCertification;
  request.studentEnglishCertification =
    studentEnglishCertification;
  request.studentComment = studentComment;
  request.legalRepresentative.name = legalRepresentative.name;
  request.legalRepresentative.surname = legalRepresentative.surname;
  request.legalRepresentative.secondSurname =
    legalRepresentative.secondSurname;
  request.legalRepresentative.phone = legalRepresentative.phone;
  request.legalRepresentative.cellphone =
    legalRepresentative.cellphone;

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
