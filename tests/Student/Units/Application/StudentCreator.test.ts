import { StudentCreateRequest } from "../../../../src/Student/Application/Create/StudentCreateRequest";
import { StudentCreator } from "../../../../src/Student/Application/Create/StudentCreator";
import { Uuid } from "../../../../src/Shared/Domain/ValueObject/Primitives/Uuid";
import { Student } from "../../../../src/Student/Domain/Student";

describe("StudentCreator", () => {
  let studentRepository = {
    create: jest.fn(),
    existsByDni: jest.fn(),
    existsById: jest.fn(),
  };
  let studentCreator: StudentCreator;

  beforeEach(() => {
    studentCreator = new StudentCreator(studentRepository as any);
  });

  let studentCreateDto = new StudentCreateRequest();
  studentCreateDto = {
    id: Uuid.random().toString(),
    dni: "12345678",
    name: "John",
    surname: "Doe",
    secondSurname: "Smith",
    email: "jhon.smith@gmail.com",
    phone: "123456",
    birthdate: "2019-01-01",
    cellphone: "123456789",
    address: {
      id: Uuid.random().toString(),
      street: "Street 123",
      neighborhood: "",
      city: "White City",
      state: "New York",
      reference: "at the corner of the street",
    },
    academicInstitution: "University of New York",
    workplace: "Google",
    englishCertification: "TOEFL",
    comment: "Good student",
    legalRepresentative: {
      name: "Jane",
      surname: "Doe",
      secondSurname: "Smith",
      phone: "123456",
      cellphone: "123456789",
    },
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
    studentCreateDtoCopy.dni = "1234567";

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `${Student.tag()} - DNI ${studentCreateDtoCopy.dni} is invalid`,
      ]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with incorrect email it should response with an error", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.email = "jhon.smithgmail.com";

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `${Student.tag()} - Email ${
          studentCreateDtoCopy.email
        } is invalid`,
      ]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with incorrect birthdate it should response with an error", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.birthdate = "2019-13-01";

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `${Student.tag()} - Invalid birthdate format`,
      ]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with incorrect cellphone it should response with an error", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.cellphone = "12345";

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `${Student.tag()} - Cellphone ${
          studentCreateDtoCopy.cellphone
        } is invalid`,
      ]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with incorrect english certification it should response with an error", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.englishCertification = "TOEFL";

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `${Student.tag()} - English certification value is not valid`,
      ]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with more than one error it should response with all the errors", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.dni = "1234567";
    studentCreateDtoCopy.email = "jhon.smithgmail.com";
    studentCreateDtoCopy.birthdate = "2019-13-01";
    studentCreateDtoCopy.cellphone = "12345";
    studentCreateDtoCopy.englishCertification = "TOEFL";

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(false);
      expect(response.data).toEqual([
        `${Student.tag()} - DNI ${studentCreateDtoCopy.dni} is invalid`,
        `${Student.tag()} - Email ${
          studentCreateDtoCopy.email
        } is invalid`,
        `${Student.tag()} - Invalid birthdate format`,
        `${Student.tag()} - Cellphone ${
          studentCreateDtoCopy.cellphone
        } is invalid`,
        `${Student.tag()} - English certification value is not valid`,
      ]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with adult student and empty legal representative data it should response successfully", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.birthdate = "1990-01-01";
    studentCreateDtoCopy.legalRepresentative.name = "";
    studentCreateDtoCopy.legalRepresentative.surname = "";
    studentCreateDtoCopy.legalRepresentative.secondSurname = "";
    studentCreateDtoCopy.legalRepresentative.phone = "";
    studentCreateDtoCopy.legalRepresentative.cellphone = "";

    let response = studentCreator.run(studentCreateDtoCopy);

    response.then((response) => {
      expect(response.success).toBe(true);
      expect(response.data).toEqual([]);
      expect(studentRepository.create).toHaveBeenCalled();
    });
  });

  test("with minor student and empty legal representative data it should response with an error", () => {
    let studentCreateDtoCopy = structuredClone(studentCreateDto);
    studentCreateDtoCopy.birthdate = "2010-01-01";
    studentCreateDtoCopy.legalRepresentative.name = "";
    studentCreateDtoCopy.legalRepresentative.surname = "";
    studentCreateDtoCopy.legalRepresentative.secondSurname = "";
    studentCreateDtoCopy.legalRepresentative.phone = "";
    studentCreateDtoCopy.legalRepresentative.cellphone = "";

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
