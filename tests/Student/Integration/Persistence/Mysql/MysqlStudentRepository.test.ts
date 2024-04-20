import { AcademicInstitution } from "../../../../../src/Shared/Domain/ValueObject/EducationalData/AcademicInstitution";
import { EnglishCertificate } from "../../../../../src/Shared/Domain/ValueObject/EducationalData/EnglishCertificate";
import { Birthdate } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/Birthdate";
import { Cellphone } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/Cellphone";
import { Dni } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/Dni";
import { Email } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/Email";
import { FirstName } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/FirstName";
import { Phone } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/Phone";
import { Surname } from "../../../../../src/Shared/Domain/ValueObject/PersonalData/Surname";
import { Uuid } from "../../../../../src/Shared/Domain/ValueObject/Primitives/Uuid";
import { Workplace } from "../../../../../src/Shared/Domain/ValueObject/Workplace/Workplace";
import { Address } from "../../../../../src/Student/Domain/Address";
import { LegalRepresentative } from "../../../../../src/Student/Domain/LegalRepresentative";
import { Student } from "../../../../../src/Student/Domain/Student";
import { Comment } from "../../../../../src/Student/Domain/ValueObject/Comment";
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
      new AcademicInstitution("University of New York", Student.getDomainTag()),
      new Workplace("Google", Student.getDomainTag()),
      new EnglishCertificate("TOEFL", false, Student.getDomainTag()),
      new Comment("Good student", Student.getDomainTag()),
      Address.getEmptyObject(),
      LegalRepresentative.getEmptyObject()
    );
  });

  test.skip("should save a student successfully", async () => {
    const result = await studentRepository.create(student);
    expect(result).toBeUndefined();
  });
});
