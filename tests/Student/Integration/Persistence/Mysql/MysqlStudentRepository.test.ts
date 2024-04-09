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
import { StudentFile } from "../../../../../src/Student/Domain/StudentFile";
import { MysqlStudentRepository } from "../../../../../src/Student/Infrastructure/Persistence/Mysql/MysqlStudentRepository";

describe("MysqlStudentRepository - save Method", () => {
  let studentRepository: MysqlStudentRepository;
  let student: Student;

  beforeEach(() => {
    studentRepository = new MysqlStudentRepository();
    student = new Student(
      studentRepository,
      Uuid.random(),
      new Dni("12345678"),
      new FirstName("John"),
      new Surname("Doe"),
      new Surname("Smith"),
      new Email("john.doe@gmail.com"),
      new Phone("123456"),
      new Birthdate("2019-01-01"),
      new Cellphone("123456789"),
      Address.getEmptyObject(),
      LegalRepresentative.getEmptyObject(),
      StudentFile.getEmptyObject()
    );
  });

  test.skip("should save a student", async () => {
    const result = await studentRepository.save(student);
    expect(result).toBeUndefined();
  });
});
