import { StudentCreateDto } from "../../../src/Student/Application/Dto/StudentCreateDto";
import { StudentCreator } from "../../../src/Student/Application/StudentCreator";
import { MysqlStudentRepository } from "../../../src/Student/Infrastructure/Persistence/Mysql/MysqlStudentRepository";

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
    studentAddressId,
    studentAddressStreet,
    studentAddressNeighborhood,
    studentAddressCity,
    studentAddressState,
    studentAddressReference,
    studentFileId,
    studentAcademicInstitution,
    studentWorkplace,
    studentIsOtherEnglishCertification,
    studentEnglishCertification,
    studentComment,
    legalRepresentativeId,
    legalRepresentativeName,
    legalRepresentativeSurname,
    legalRepresentativeSecondSurname,
    legalRepresentativePhone,
    legalRepresentativeCellphone,
  } = req.body;
  const studentCreateDto = new StudentCreateDto();
  studentCreateDto.studentId = studentId;
  studentCreateDto.studentDni = studentDni;
  studentCreateDto.studentName = studentName;
  studentCreateDto.studentSurname = studentSurname;
  studentCreateDto.studentSecondSurname = studentSecondSurname;
  studentCreateDto.studentEmail = studentEmail;
  studentCreateDto.studentPhone = studentPhone;
  studentCreateDto.studentBirthdate = studentBirthdate;
  studentCreateDto.studentCellphone = studentCellphone;
  studentCreateDto.studentAddressId = studentAddressId;
  studentCreateDto.studentAddressStreet = studentAddressStreet;
  studentCreateDto.studentAddressNeighborhood = studentAddressNeighborhood;
  studentCreateDto.studentAddressCity = studentAddressCity;
  studentCreateDto.studentAddressState = studentAddressState;
  studentCreateDto.studentAddressReference = studentAddressReference;
  studentCreateDto.studentFileId = studentFileId;
  studentCreateDto.studentAcademicInstitution = studentAcademicInstitution;
  studentCreateDto.studentWorkplace = studentWorkplace;
  studentCreateDto.studentIsOtherEnglishCertification =
    studentIsOtherEnglishCertification;
  studentCreateDto.studentEnglishCertification = studentEnglishCertification;
  studentCreateDto.studentComment = studentComment;
  studentCreateDto.legalRepresentativeId = legalRepresentativeId;
  studentCreateDto.legalRepresentativeName = legalRepresentativeName;
  studentCreateDto.legalRepresentativeSurname = legalRepresentativeSurname;
  studentCreateDto.legalRepresentativeSecondSurname =
    legalRepresentativeSecondSurname;
  studentCreateDto.legalRepresentativePhone = legalRepresentativePhone;
  studentCreateDto.legalRepresentativeCellphone = legalRepresentativeCellphone;

  const studentCreator = new StudentCreator(new MysqlStudentRepository());
  const response = await studentCreator.run(studentCreateDto);
  res.json(response);
};
