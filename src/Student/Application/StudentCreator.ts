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
import { EnglishCertification } from "../../Shared/Domain/ValueObject/EducationalData/EnglishCertification";
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
      new Uuid(studentCreateDto.legalRepresentativeId),
      new FirstName(studentCreateDto.legalRepresentativeName),
      new Surname(studentCreateDto.legalRepresentativeSurname),
      new Surname(studentCreateDto.legalRepresentativeSecondSurname, true),
      new Phone(studentCreateDto.legalRepresentativePhone, true),
      new Cellphone(studentCreateDto.legalRepresentativeCellphone, true)
    );

    const studentFile = new StudentFile(
      new Uuid(studentCreateDto.studentFileId),
      new AcademicInstitution(studentCreateDto.studentAcademicInstitution),
      new Workplace(studentCreateDto.studentWorkplace),
      new EnglishCertification(
        studentCreateDto.studentEnglishCertification,
        studentCreateDto.studentIsOtherEnglishCertification
      ),
      new Comment(studentCreateDto.studentComment)
    );

    const address = new Address(
      new Uuid(studentCreateDto.studentAddressId),
      new Street(studentCreateDto.studentAddressStreet),
      new Neighborhood(studentCreateDto.studentAddressNeighborhood, true),
      new City(studentCreateDto.studentAddressCity),
      new State(studentCreateDto.studentAddressState),
      new Reference(studentCreateDto.studentAddressReference, true)
    );

    const student = new Student(
      this.repository,
      new Uuid(studentCreateDto.studentId),
      new Dni(studentCreateDto.studentDni),
      new FirstName(studentCreateDto.studentName),
      new Surname(studentCreateDto.studentSurname),
      new Surname(studentCreateDto.studentSecondSurname, true),
      new Email(studentCreateDto.studentEmail, true),
      new Phone(studentCreateDto.studentPhone, true),
      new Birthdate(studentCreateDto.studentBirthdate),
      new Cellphone(studentCreateDto.studentCellphone, true),
      address,
      legalRepresentative,
      studentFile
    );
    return await student.save();
  }
}
