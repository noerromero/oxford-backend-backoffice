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
import { AcademicInformation } from "../../../../src/Student/Domain/AcademicInformation";
import { Comment } from "../../../../src/Student/Domain/ValueObject/Comment";

describe("Student - isAdult Property", () => {
  let studentRepository = { save: jest.fn() };
  let student: Student;

  beforeEach(() => {
    student = new Student(
      studentRepository as any,
      Uuid.random(),
      new Dni("12345678", Student.getDomainTag()),
      new FirstName("John", Student.getDomainTag()),
      new Surname("Doe", Student.getDomainTag()),
      new Surname("Smith", Student.getDomainTag()),
      new Email("jhon.doe@gmail.com", Student.getDomainTag()),
      new Phone("123456", Student.getDomainTag()),
      new Birthdate("2019-01-01", Student.getDomainTag()),
      new Cellphone("123456789", Student.getDomainTag()),
      new Address(
        Uuid.random(),
        new Street("Street 123", Address.getDomainTag()),
        new Neighborhood("", Address.getDomainTag()),
        new City("White City", Address.getDomainTag()),
        new State("New York", Address.getDomainTag()),
        new Reference("at the corner of the street", Address.getDomainTag())
      ),
      new LegalRepresentative(
        Uuid.random(),
        new FirstName("Jane", LegalRepresentative.getDomainTag()),
        new Surname("Doe", LegalRepresentative.getDomainTag()),
        new Surname("Smith", LegalRepresentative.getDomainTag()),
        new Phone("123456", LegalRepresentative.getDomainTag()),
        new Cellphone("123456789", LegalRepresentative.getDomainTag())
      ),
      new AcademicInformation(
        Uuid.random(),
        new AcademicInstitution(
          "University of New York",
          AcademicInformation.getEntityName()
        ),
        new Workplace("Google", AcademicInformation.getEntityName()),
        new EnglishCertificate(
          "TOEFL",
          false,
          AcademicInformation.getEntityName()
        ),
        new Comment("Good student", AcademicInformation.getEntityName())
      )
    );
  });

  test("with minor birthdate it should response false", () => {
    let date: Date = new Date();
    date.setFullYear(date.getFullYear() - 17);
    let formattedDate: string = date.toISOString().slice(0, 10);

    student.setBirthdate(new Birthdate(formattedDate, Student.getDomainTag()));
    expect(student.isAdult()).toBe(false);
  });

  test("with adult birthdate it should response true", () => {
    let date: Date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    let formattedDate: string = date.toISOString().slice(0, 10);

    student.setBirthdate(new Birthdate(formattedDate, Student.getDomainTag()));
    expect(student.isAdult()).toBe(true);
  });
});
