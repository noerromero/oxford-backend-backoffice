import { Birthdate } from "../../../../src/Shared/Domain/ValueObject/PersonalData/Birthdate";
import { Uuid } from "../../../../src/Shared/Domain/ValueObject/Primitives/Uuid";
import { Address } from "../../../../src/Student/Domain/Address";
import { LegalRepresentative } from "../../../../src/Student/Domain/LegalRepresentative";
import { Student } from "../../../../src/Student/Domain/Student";

describe("Student - isAdult Property", () => {
  let studentRepository = { save: jest.fn() };
  let student: Student;

  beforeEach(() => {
    const address = Address.create(
      Uuid.random().toString(),
        "Street 123",
        "",
        "White City",
        "New York",
        "at the corner of the street"
    );

    const legalRepresentative = LegalRepresentative.create(
      "Jane",
        "Doe",
        "Smith",
        "123456",
        "123456789",
    );

    student = Student.create(
      Uuid.random().toString(),
      "12345678",
      "John",
      "Doe",
      "Smith",
      "jhon.doe@gmail.com",
      "123456",
      "2019-01-01",
      "123456789",
      "University of New York",
      "Google",
      "TOEFL",
      "Good student",
      address,
      legalRepresentative
    );

    student.setRepository(studentRepository);
  });

  test("with minor birthdate it should response false", () => {
    let date: Date = new Date();
    date.setFullYear(date.getFullYear() - 17);
    let formattedDate: string = date.toISOString().slice(0, 10);

    student.setBirthdate(new Birthdate(formattedDate, Student.tag()));
    expect(student.isAdult()).toBe(false);
  });

  test("with adult birthdate it should response true", () => {
    let date: Date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    let formattedDate: string = date.toISOString().slice(0, 10);

    student.setBirthdate(new Birthdate(formattedDate, Student.tag()));
    expect(student.isAdult()).toBe(true);
  });
});
