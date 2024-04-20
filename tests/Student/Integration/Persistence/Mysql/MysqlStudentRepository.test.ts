import { Birthdate } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/Birthdate";
import { Cellphone } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/Cellphone";
import { Dni } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/Dni";
import { Email } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/Email";
import { FirstName } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/FirstName";
import { Phone } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/Phone";
import { Surname } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/Surname";
import { Uuid } from "../../../../../src/Shared/Domain/ValueObject/Primitives/Uuid";
import { Address } from "../../../../../src/Student/Domain/Address";
import { LegalRepresentative } from "../../../../../src/Student/Domain/LegalRepresentative";
import { Student } from "../../../../../src/Student/Domain/Student";
import { AcademicInformation } from "../../../../../src/Student/Domain/AcademicInformation";
import { MysqlStudentRepository } from "../../../../../src/Student/Infrastructure/Persistence/Mysql/MysqlStudentRepository";

describe("MysqlStudentRepository - save Method", () => {
  let studentRepository: MysqlStudentRepository;
  let student: Student;

  beforeEach(() => {
    studentRepository = new MysqlStudentRepository();
    student = new Student(
      studentRepository,
      Uuid.random(),
      new Dni("12345678", Student.getDomainTag()),
      new FirstName("John", Student.getDomainTag()),
      new Surname("Doe", Student.getDomainTag()),
      new Surname("Smith", Student.getDomainTag()),
      new Email("john.doe@gmail.com", Student.getDomainTag()),
      new Phone("123456", Student.getDomainTag()),
      new Birthdate("2019-01-01", Student.getDomainTag()),
      new Cellphone("123456789", Student.getDomainTag()),
      Address.getEmptyObject(),
      LegalRepresentative.getEmptyObject(),
      AcademicInformation.getEmptyObject()
    );
  });

  test.skip("should save a student successfully", async () => {
    const result = await studentRepository.create(student);
    expect(result).toBeUndefined();
  });
});
