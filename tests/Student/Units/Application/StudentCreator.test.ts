import { StudentCreateDto } from "../../../../src/Student/Application/Dto/StudentCreateDto";
import { StudentCreator } from "../../../../src/Student/Application/StudentCreator";
import { Uuid } from "../../../../src/Shared/Domain/ValueObject/Primitives/Uuid";
import { Student } from "../../../../src/Student/Domain/Student";

describe("StudentFileCreator", () => {
  let studentRepository = { create: jest.fn() };
  let studentCreator: StudentCreator;

  beforeEach(() => {
    studentCreator = new StudentCreator(studentRepository as any);
  });

  let studentCreateDto = new StudentCreateDto();
  studentCreateDto = {
    studentId: Uuid.random().toString(),
    studentDni: "12345678",
    studentName: "John",
    studentSurname: "Doe",
    studentSecondSurname: "Smith",
    studentEmail: "jhon.smith@gmail.com",
    studentPhone: "123456",
    studentBirthdate: "2019-01-01",
    studentCellphone: "123456789",
    studentAddressId: Uuid.random().toString(),
    studentAddressStreet: "Street 123",
    studentAddressNeighborhood: "",
    studentAddressCity: "White City",
    studentAddressState: "New York",
    studentAddressReference: "at the corner of the street",
    studentAcademicInstitution: "University of New York",
    studentWorkplace: "Google",
    studentIsOtherEnglishCertification: true,
    studentEnglishCertification: "TOEFL",
    studentComment: "Good student",
    legalRepresentativeName: "Jane",
    legalRepresentativeSurname: "Doe",
    legalRepresentativeSecondSurname: "Smith",
    legalRepresentativePhone: "123456",
    legalRepresentativeCellphone: "123456789",
  };

  test("with all the correct data it should response successfully", () => {
    let response = studentCreator.run(studentCreateDto);

    response.then((response) => {
      expect(response.success).toBe(true);
      expect(response.data).toEqual([]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with incorrect dni it should response with an error", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.studentDni = "1234567";

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `${Student.getDomainTag()} - DNI ${
          studentCreateDtoCopy.studentDni
        } is invalid`,
      ]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with incorrect email it should response with an error", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.studentEmail = "jhon.smithgmail.com";

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `${Student.getDomainTag()} - Email ${
          studentCreateDtoCopy.studentEmail
        } is invalid`,
      ]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with incorrect birthdate it should response with an error", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.studentBirthdate = "2019-13-01";

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `${Student.getDomainTag()} - Invalid birthdate format`,
      ]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with incorrect cellphone it should response with an error", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.studentCellphone = "12345";

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `${Student.getDomainTag()} - Cellphone ${
          studentCreateDtoCopy.studentCellphone
        } is invalid`,
      ]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with incorrect english certification it should response with an error", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.studentEnglishCertification = "TOEFL";
    studentCreateDtoCopy.studentIsOtherEnglishCertification = false;

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `${Student.getDomainTag()} - English certification value is not valid`,
      ]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with more than one error it should response with all the errors", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.studentDni = "1234567";
    studentCreateDtoCopy.studentEmail = "jhon.smithgmail.com";
    studentCreateDtoCopy.studentBirthdate = "2019-13-01";
    studentCreateDtoCopy.studentCellphone = "12345";
    studentCreateDtoCopy.studentEnglishCertification = "TOEFL";
    studentCreateDtoCopy.studentIsOtherEnglishCertification = false;

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `${Student.getDomainTag()} - DNI ${
          studentCreateDtoCopy.studentDni
        } is invalid`,
        `${Student.getDomainTag()} - Email ${
          studentCreateDtoCopy.studentEmail
        } is invalid`,
        `${Student.getDomainTag()} - Invalid birthdate format`,
        `${Student.getDomainTag()} - Cellphone ${
          studentCreateDtoCopy.studentCellphone
        } is invalid`,
        `${Student.getDomainTag()} - English certification value is not valid`,
      ]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with adult student and empty legal representative data it should response successfully", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.studentBirthdate = "1990-01-01";
    studentCreateDtoCopy.legalRepresentativeName = "";
    studentCreateDtoCopy.legalRepresentativeSurname = "";
    studentCreateDtoCopy.legalRepresentativeSecondSurname = "";
    studentCreateDtoCopy.legalRepresentativePhone = "";
    studentCreateDtoCopy.legalRepresentativeCellphone = "";

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(true);
      expect(response.data).toEqual([]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with minor student and empty legal representative data it should response with an error", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.studentBirthdate = "2010-01-01";
    studentCreateDtoCopy.legalRepresentativeName = "";
    studentCreateDtoCopy.legalRepresentativeSurname = "";
    studentCreateDtoCopy.legalRepresentativeSecondSurname = "";
    studentCreateDtoCopy.legalRepresentativePhone = "";
    studentCreateDtoCopy.legalRepresentativeCellphone = "";

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `Legal representative is required for minor students`,
      ]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });
});
