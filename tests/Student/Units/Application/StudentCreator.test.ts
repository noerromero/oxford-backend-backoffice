import { StudentCreateDto } from "../../../../src/Student/Application/Dto/StudentCreateDto";
import { StudentCreator } from "../../../../src/Student/Application/StudentCreator";
import { Uuid } from "../../../../src/Shared/Domain/ValueObject/Primitives/Uuid";

describe("StudentFileCreator", () => {
  let studentRepository = { save: jest.fn() };
  let studentFileCreator: StudentCreator;

  beforeEach(() => {
    studentFileCreator = new StudentCreator(studentRepository as any);
  });

  let studentDto = new StudentCreateDto();
  studentDto = {
    studentFileId: Uuid.random().toString(),
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
    legalRepresentativeId: Uuid.random().toString(),
    legalRepresentativeName: "Jane",
    legalRepresentativeSurname: "Doe",
    legalRepresentativeSecondSurname: "Smith",
    legalRepresentativePhone: "123456",
    legalRepresentativeCellphone: "123456789",
  };

  test("with all the correct data it should response successfully", () => {
    let response = studentFileCreator.run(studentDto);

    response.then((response) => {
      expect(response.success).toBe(true);
      expect(response.data).toEqual([]);
      expect(studentRepository.save).toHaveBeenCalled();
    });
  });

  test("with incorrect dni it should response with an error", () => {
    let studentFileDtoCopy = structuredClone(studentDto);
    studentFileDtoCopy.studentDni = "1234567";

    let response = studentFileCreator.run(studentFileDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `Person ID ${studentFileDtoCopy.studentDni} is invalid`,
      ]);
      expect(studentRepository.save).toHaveBeenCalled();
    });
  });

  test("with incorrect email it should response with an error", () => {
    let studentFileDtoCopy = structuredClone(studentDto);
    studentFileDtoCopy.studentEmail = "jhon.smithgmail.com";

    let response = studentFileCreator.run(studentFileDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `Email ${studentFileDtoCopy.studentEmail} is invalid`,
      ]);
      expect(studentRepository.save).toHaveBeenCalled();
    });
  });

  test("with incorrect birthdate it should response with an error", () => {
    let studentFileDtoCopy = structuredClone(studentDto);
    studentFileDtoCopy.studentBirthdate = "2019-13-01";

    let response = studentFileCreator.run(studentFileDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([`Invalid birthdate format`]);
      expect(studentRepository.save).toHaveBeenCalled();
    });
  });

  test("with incorrect cellphone it should response with an error", () => {
    let studentFileDtoCopy = structuredClone(studentDto);
    studentFileDtoCopy.studentCellphone = "12345";

    let response = studentFileCreator.run(studentFileDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `Cellphone ${studentFileDtoCopy.studentCellphone} is invalid`,
      ]);
      expect(studentRepository.save).toHaveBeenCalled();
    });
  });

  test("with incorrect english certification it should response with an error", () => {
    let studentFileDtoCopy = structuredClone(studentDto);
    studentFileDtoCopy.studentEnglishCertification = "TOEFL";
    studentFileDtoCopy.studentIsOtherEnglishCertification = false;

    let response = studentFileCreator.run(studentFileDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        "English certification value is not valid",
      ]);
      expect(studentRepository.save).toHaveBeenCalled();
    });
  });

  test("with more than one error it should response with all the errors", () => {
    let studentFileDtoCopy = structuredClone(studentDto);
    studentFileDtoCopy.studentDni = "1234567";
    studentFileDtoCopy.studentEmail = "jhon.smithgmail.com";
    studentFileDtoCopy.studentBirthdate = "2019-13-01";
    studentFileDtoCopy.studentCellphone = "12345";
    studentFileDtoCopy.studentEnglishCertification = "TOEFL";
    studentFileDtoCopy.studentIsOtherEnglishCertification = false;

    let response = studentFileCreator.run(studentFileDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `Person ID ${studentFileDtoCopy.studentDni} is invalid`,
        `Email ${studentFileDtoCopy.studentEmail} is invalid`,
        `Invalid birthdate format`,
        `Cellphone ${studentFileDtoCopy.studentCellphone} is invalid`,
        "English certification value is not valid",
      ]);
      expect(studentRepository.save).toHaveBeenCalled();
    });
  });
});
