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
      new FirstName(
        studentCreateDto.legalRepresentativeName,
        LegalRepresentative.getDomainTag()
      ),
      new Surname(
        studentCreateDto.legalRepresentativeSurname,
        LegalRepresentative.getDomainTag()
      ),
      new Surname(
        studentCreateDto.legalRepresentativeSecondSurname,
        LegalRepresentative.getDomainTag(),
        true
      ),
      new Phone(
        studentCreateDto.legalRepresentativePhone,
        LegalRepresentative.getDomainTag(),
        true
      ),
      new Cellphone(
        studentCreateDto.legalRepresentativeCellphone,
        LegalRepresentative.getDomainTag(),
        true
      )
    );

    const address = new Address(
      new Uuid(studentCreateDto.studentAddressId, Address.getDomainTag()),
      new Street(studentCreateDto.studentAddressStreet, Address.getDomainTag()),
      new Neighborhood(
        studentCreateDto.studentAddressNeighborhood,
        Address.getDomainTag(),
        true
      ),
      new City(studentCreateDto.studentAddressCity, Address.getDomainTag()),
      new State(studentCreateDto.studentAddressState, Address.getDomainTag()),
      new Reference(
        studentCreateDto.studentAddressReference,
        Address.getDomainTag(),
        true
      ),
      new Uuid(studentCreateDto.studentId, LegalRepresentative.getDomainTag())
    );

    const student = new Student(
      this.repository,
      new Uuid(studentCreateDto.studentId, Student.getDomainTag()),
      new Dni(studentCreateDto.studentDni, Student.getDomainTag()),
      new FirstName(studentCreateDto.studentName, Student.getDomainTag()),
      new Surname(studentCreateDto.studentSurname, Student.getDomainTag()),
      new Surname(
        studentCreateDto.studentSecondSurname,
        Student.getDomainTag(),
        true
      ),
      new Email(studentCreateDto.studentEmail, Student.getDomainTag(), true),
      new Phone(studentCreateDto.studentPhone, Student.getDomainTag(), true),
      new Birthdate(studentCreateDto.studentBirthdate, Student.getDomainTag()),
      new Cellphone(
        studentCreateDto.studentCellphone,
        Student.getDomainTag(),
        true
      ),
      new AcademicInstitution(
        studentCreateDto.studentAcademicInstitution,
        Student.getDomainTag()
      ),
      new Workplace(
        studentCreateDto.studentWorkplace,
        Student.getDomainTag()
      ),
      new EnglishCertificate(
        studentCreateDto.studentEnglishCertification,
        studentCreateDto.studentIsOtherEnglishCertification,
        Student.getDomainTag()
      ),
      new Comment(
        studentCreateDto.studentComment,
        Student.getDomainTag()
      ),
      address,
      legalRepresentative
    );
    return await student.create();
  }
}
