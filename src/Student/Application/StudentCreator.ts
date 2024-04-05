import { DomainResponse } from "../../Shared/Domain/DomainResponse";
import { PersonId } from "../../Shared/Domain/ValueObject/PersonalData/PersonId";
import { FirstName } from "../../Shared/Domain/ValueObject/PersonalData/FirstName";
import { Student } from "../Domain/Student";
import { IStudentRepository } from "../Domain/IStudentRepository";
import { Surname } from "../../Shared/Domain/ValueObject/PersonalData/Surname";
import { Email } from "../../Shared/Domain/ValueObject/PersonalData/Email";
import { Phone } from "../../Shared/Domain/ValueObject/PersonalData/Phone";
import { Birthdate } from "../../Shared/Domain/ValueObject/PersonalData/Birthdate";
import { Cellphone } from "../../Shared/Domain/ValueObject/PersonalData/Cellphone";
import { Address } from "../Domain/Address";
import { StudentDto } from "./Dto/StudentDto";
import { Street } from "../../Shared/Domain/ValueObject/Address/Street";
import { Neighborhood } from "../../Shared/Domain/ValueObject/Address/Neighborhood";
import { City } from "../../Shared/Domain/ValueObject/Address/City";
import { State } from "../../Shared/Domain/ValueObject/Address/State";
import { Reference } from "../../Shared/Domain/ValueObject/Address/Reference";
import { StudentFile } from "../Domain/StudentFile";
import { AcademicInstitution } from "../../Shared/Domain/ValueObject/EducationalData/AcademicInstitution";
import { Workplace } from "../../Shared/Domain/ValueObject/Workplace/Workplace";
import { EnglishCertification } from "../../Shared/Domain/ValueObject/EducationalData/EnglishCertification";
import { Comment } from "../Domain/ValueObject/Comment";
import { LegalRepresentative } from "../Domain/LegalRepresentative";
import { Uuid } from "../../Shared/Domain/ValueObject/Primitives/Uuid";

export class StudentCreator {
  private repository: IStudentRepository;

  constructor(repository: IStudentRepository) {
    this.repository = repository;
  }

  async run(studentFileDto: StudentDto): Promise<DomainResponse> {
    const legalRepresentative = new LegalRepresentative(
      new Uuid(studentFileDto.legalRepresentativeId),
      new FirstName(studentFileDto.legalRepresentativeName),
      new Surname(studentFileDto.legalRepresentativeSurname),
      new Surname(studentFileDto.legalRepresentativeSecondSurname, true),
      new Phone(studentFileDto.legalRepresentativePhone, true),
      new Cellphone(studentFileDto.legalRepresentativeCellphone, true)
    );

    const studentFile = new StudentFile(
      new Uuid(studentFileDto.studentFileId),
      new AcademicInstitution(studentFileDto.academicInstitution),
      new Workplace(studentFileDto.workplace),
      new EnglishCertification(
        studentFileDto.englishCertification,
        studentFileDto.isOtherEnglishCertification
      ),
      new Comment(studentFileDto.comment)
    );

    const student = new Student(
      this.repository,
      new Uuid(studentFileDto.studentId),
      new PersonId(studentFileDto.studentDni),
      new FirstName(studentFileDto.studentName),
      new Surname(studentFileDto.studentSurname),
      new Surname(studentFileDto.studentSecondSurname, true),
      new Email(studentFileDto.studentEmail, true),
      new Phone(studentFileDto.studentPhone, true),
      new Birthdate(studentFileDto.studentBirthdate),
      new Cellphone(studentFileDto.studentCellphone, true),
      new Address(
        new Uuid(studentFileDto.addressId),
        new Street(studentFileDto.addressStreet),
        new Neighborhood(studentFileDto.addressNeighborhood, true),
        new City(studentFileDto.addressCity),
        new State(studentFileDto.addressState),
        new Reference(studentFileDto.addressReference, true)
      ),
      legalRepresentative,
      studentFile
    );
    return await student.save();
  }
}
