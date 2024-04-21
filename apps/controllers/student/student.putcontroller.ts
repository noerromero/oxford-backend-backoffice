import { StudentUpdateRequest } from "../../../src/Student/Application/Dto/StudentUpdateRequest";
import { StudentUpdater } from "../../../src/Student/Application/StudentUpdater";
import { MysqlStudentRepository } from "../../../src/Student/Infrastructure/Persistence/Mysql/MysqlStudentRepository";

export const putStudent = async (req: any, res: any) => {
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
      studentAcademicInstitution,
      studentWorkplace,
      studentIsOtherEnglishCertification,
      studentEnglishCertification,
      studentComment,
      legalRepresentativeName,
      legalRepresentativeSurname,
      legalRepresentativeSecondSurname,
      legalRepresentativePhone,
      legalRepresentativeCellphone,
    } = req.body;
    const request = new StudentUpdateRequest();
    request.studentId = studentId;
    request.studentDni = studentDni;
    request.studentName = studentName;
    request.studentSurname = studentSurname;
    request.studentSecondSurname = studentSecondSurname;
    request.studentEmail = studentEmail;
    request.studentPhone = studentPhone;
    request.studentBirthdate = studentBirthdate;
    request.studentCellphone = studentCellphone;
    request.studentAddressId = studentAddressId;
    request.studentAddressStreet = studentAddressStreet;
    request.studentAddressNeighborhood = studentAddressNeighborhood;
    request.studentAddressCity = studentAddressCity;
    request.studentAddressState = studentAddressState;
    request.studentAddressReference = studentAddressReference;
    request.studentAcademicInstitution = studentAcademicInstitution;
    request.studentWorkplace = studentWorkplace;
    request.studentIsOtherEnglishCertification =
      studentIsOtherEnglishCertification;
    request.studentEnglishCertification = studentEnglishCertification;
    request.studentComment = studentComment;
    request.legalRepresentativeName = legalRepresentativeName;
    request.legalRepresentativeSurname = legalRepresentativeSurname;
    request.legalRepresentativeSecondSurname =
      legalRepresentativeSecondSurname;
    request.legalRepresentativePhone = legalRepresentativePhone;
    request.legalRepresentativeCellphone = legalRepresentativeCellphone;
  
    const studentUpdater = new StudentUpdater(new MysqlStudentRepository());
    try {
      const response = await studentUpdater.run(request);
      if (!response.success) {
        return res.status(400).json(response);
      }
      return res.status(201).json(response);
    } catch (e) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
  