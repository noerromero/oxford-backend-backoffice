import { DomainResponse } from "../../Shared/Domain/DomainResponse";
import { Dni } from "../../Shared/Domain/ValueObject/PersonalData/Dni";
import { FirstName } from "../../Shared/Domain/ValueObject/PersonalData/FirstName";
import { Student } from "../Domain/Student";
import { IStudentRepository } from "../Domain/IStudentRepository";
import { Surname } from "../../Shared/Domain/ValueObject/PersonalData/Surname";
import { Email } from "../../Shared/Domain/ValueObject/PersonalData/Email";
import { Phone } from "../../Shared/Domain/ValueObject/PersonalData/Phone";
import { Birthdate } from "../../Shared/Domain/ValueObject/PersonalData/Birthdate";
import { Cellphone } from "../../Shared/Domain/ValueObject/PersonalData/Cellphone";
import { Address } from "../Domain/Address";
import { StudentCreateDto } from "./Dto/StudentCreateDto";
import { Street } from "../../Shared/Domain/ValueObject/Address/Street";
import { Neighborhood } from "../../Shared/Domain/ValueObject/Address/Neighborhood";
import { City } from "../../Shared/Domain/ValueObject/Address/City";
import { State } from "../../Shared/Domain/ValueObject/Address/State";
import { Reference } from "../../Shared/Domain/ValueObject/Address/Reference";
import { StudentFile } from "../Domain/StudentFile";
import { AcademicInstitution } from "../../Shared/Domain/ValueObject/EducationalData/AcademicInstitution";
import { Workplace } from "../../Shared/Domain/ValueObject/Workplace/Workplace";
import { EnglishCertificate } from "../../Shared/Domain/ValueObject/EducationalData/EnglishCertificate";
import { Comment } from "../Domain/ValueObject/Comment";
import { LegalRepresentative } from "../Domain/LegalRepresentative";
import { Uuid } from "../../Shared/Domain/ValueObject/Primitives/Uuid";

export class StudentCreator {
  private repository: IStudentRepository;

  constructor(repository: IStudentRepository) {
    this.repository = repository;
  }

  async run(studentCreateDto: StudentCreateDto): Promise<DomainResponse> {
    const legalRepresentative = new LegalRepresentative(
      new Uuid(studentCreateDto.legalRepresentativeId, LegalRepresentative.getEntityName()),
      new FirstName(studentCreateDto.legalRepresentativeName, LegalRepresentative.getEntityName()),
      new Surname(studentCreateDto.legalRepresentativeSurname, LegalRepresentative.getEntityName()),
      new Surname(studentCreateDto.legalRepresentativeSecondSurname, LegalRepresentative.getEntityName(), true),
      new Phone(studentCreateDto.legalRepresentativePhone, LegalRepresentative.getEntityName(), true),
      new Cellphone(studentCreateDto.legalRepresentativeCellphone, LegalRepresentative.getEntityName(), true)
    );

    const studentFile = new StudentFile(
      new Uuid(studentCreateDto.studentFileId, StudentFile.getEntityName()),
      new AcademicInstitution(studentCreateDto.studentAcademicInstitution, StudentFile.getEntityName()),
      new Workplace(studentCreateDto.studentWorkplace, StudentFile.getEntityName()),
      new EnglishCertificate(
        studentCreateDto.studentEnglishCertification,
        studentCreateDto.studentIsOtherEnglishCertification,
        StudentFile.getEntityName()
      ),
      new Comment(studentCreateDto.studentComment, StudentFile.getEntityName())
    );

    const address = new Address(
      new Uuid(studentCreateDto.studentAddressId, Address.getEntityName()),
      new Street(studentCreateDto.studentAddressStreet, Address.getEntityName()),
      new Neighborhood(studentCreateDto.studentAddressNeighborhood, Address.getEntityName(), true),
      new City(studentCreateDto.studentAddressCity, Address.getEntityName()),
      new State(studentCreateDto.studentAddressState, Address.getEntityName()),
      new Reference(studentCreateDto.studentAddressReference, Address.getEntityName(), true)
    );

    const student = new Student(
      this.repository,
      new Uuid(studentCreateDto.studentId, Student.getEntityName()),
      new Dni(studentCreateDto.studentDni, Student.getEntityName()),
      new FirstName(studentCreateDto.studentName, Student.getEntityName()),
      new Surname(studentCreateDto.studentSurname, Student.getEntityName()),
      new Surname(studentCreateDto.studentSecondSurname, Student.getEntityName(), true),
      new Email(studentCreateDto.studentEmail, Student.getEntityName(), true),
      new Phone(studentCreateDto.studentPhone, Student.getEntityName(), true),
      new Birthdate(studentCreateDto.studentBirthdate, Student.getEntityName()),
      new Cellphone(studentCreateDto.studentCellphone, Student.getEntityName(), true),
      address,
      legalRepresentative,
      studentFile
    );
    return await student.save();
  }
}
