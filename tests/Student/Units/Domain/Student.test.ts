import { City } from "../../../../src/Shared/Domain/ValueObject/Address/City";
import { Neighborhood } from "../../../../src/Shared/Domain/ValueObject/Address/Neighborhood";
import { Reference } from "../../../../src/Shared/Domain/ValueObject/Address/Reference";
import { State } from "../../../../src/Shared/Domain/ValueObject/Address/State";
import { Street } from "../../../../src/Shared/Domain/ValueObject/Address/Street";
import { AcademicInstitution } from "../../../../src/Shared/Domain/ValueObject/EducationalData/AcademicInstitution";
import { EnglishCertificate } from "../../../../src/Shared/Domain/ValueObject/EducationalData/EnglishCertificate";
import { Birthdate } from "../../../../src/Shared/Domain/ValueObject/PersonalData/Birthdate";
import { Cellphone } from "../../../../src/Shared/Domain/ValueObject/PersonalData/Cellphone";
import { Email } from "../../../../src/Shared/Domain/ValueObject/PersonalData/Email";
import { FirstName } from "../../../../src/Shared/Domain/ValueObject/PersonalData/FirstName";
import { Dni } from "../../../../src/Shared/Domain/ValueObject/PersonalData/Dni";
import { Phone } from "../../../../src/Shared/Domain/ValueObject/PersonalData/Phone";
import { Surname } from "../../../../src/Shared/Domain/ValueObject/PersonalData/Surname";
import { Uuid } from "../../../../src/Shared/Domain/ValueObject/Primitives/Uuid";
import { Workplace } from "../../../../src/Shared/Domain/ValueObject/Workplace/Workplace";
import { Address } from "../../../../src/Student/Domain/Address";
import { LegalRepresentative } from "../../../../src/Student/Domain/LegalRepresentative";
import { Student } from "../../../../src/Student/Domain/Student";
import { StudentFolder } from "../../../../src/Student/Domain/StudentFolder";
import { Comment } from "../../../../src/Student/Domain/ValueObject/Comment";

describe("Student - isAdult Property", () => {
  let studentRepository = { save: jest.fn() };
  let student: Student;

  beforeEach(() => {
    student = new Student(
      studentRepository as any,
      Uuid.random(),
      new Dni("12345678", Student.getEntityName()),
      new FirstName("John", Student.getEntityName()),
      new Surname("Doe", Student.getEntityName()),
      new Surname("Smith", Student.getEntityName()),
      new Email("jhon.doe@gmail.com", Student.getEntityName()),
      new Phone("123456", Student.getEntityName()),
      new Birthdate("2019-01-01", Student.getEntityName()),
      new Cellphone("123456789", Student.getEntityName()),
      new Address(
        Uuid.random(),
        new Street("Street 123", Address.getEntityName()),
        new Neighborhood("", Address.getEntityName()),
        new City("White City", Address.getEntityName()),
        new State("New York", Address.getEntityName()),
        new Reference("at the corner of the street", Address.getEntityName())
      ),
      new LegalRepresentative(
        Uuid.random(),
        new FirstName("Jane", LegalRepresentative.getEntityName()),
        new Surname("Doe", LegalRepresentative.getEntityName()),
        new Surname("Smith", LegalRepresentative.getEntityName()),
        new Phone("123456", LegalRepresentative.getEntityName()),
        new Cellphone("123456789", LegalRepresentative.getEntityName())
      ),
      new StudentFolder(
        Uuid.random(),
        new AcademicInstitution(
          "University of New York",
          StudentFolder.getEntityName()
        ),
        new Workplace("Google", StudentFolder.getEntityName()),
        new EnglishCertificate("TOEFL", false, StudentFolder.getEntityName()),
        new Comment("Good student", StudentFolder.getEntityName())
      )
    );
  });

  test("with minor birthdate it should response false", () => {
    let date: Date = new Date();
    date.setFullYear(date.getFullYear() - 17);
    let formattedDate: string = date.toISOString().slice(0, 10);

    student.setBirthdate(new Birthdate(formattedDate, Student.getEntityName()));
    expect(student.isAdult()).toBe(false);
  });

  test("with adult birthdate it should response true", () => {
    let date: Date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    let formattedDate: string = date.toISOString().slice(0, 10);

    student.setBirthdate(new Birthdate(formattedDate, Student.getEntityName()));
    expect(student.isAdult()).toBe(true);
  });
});
