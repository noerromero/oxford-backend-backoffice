import { Uuid } from "../../../../../src/Shared/Domain/ValueObject/Primitives/Uuid";
import { Address } from "../../../../../src/Student/Domain/Address";
import { LegalRepresentative } from "../../../../../src/Student/Domain/LegalRepresentative";
import { Student } from "../../../../../src/Student/Domain/Student";
import { MysqlStudentRepository } from "../../../../../src/Student/Infrastructure/Persistence/Mysql/MysqlStudentRepository";

describe("MysqlStudentRepository - save Method", () => {
  let studentRepository: MysqlStudentRepository;
  let student: Student;

  beforeEach(() => {
    studentRepository = new MysqlStudentRepository();
    student = Student.create(
      Uuid.random().toString(),
      "12345678",
      "John",
      "Doe",
      "Smith",
      "john.doe@gmail.com",
      "123456",
      "2019-01-01",
      "123456789",
      "University of New York",
      "Google",
      "TOEFL",
      "Good student",
      Address.getEmptyObject(),
      LegalRepresentative.getEmptyObject()
    );

    student.setRepository(studentRepository);
  });

  test.skip("should save a student successfully", async () => {
    const result = await studentRepository.create(student);
    expect(result).toBeUndefined();
  });
});
