import { DomainResponse } from "../../Shared/Domain/DomainResponse";
import { City } from "../../Shared/Domain/ValueObject/Address/City";
import { Neighborhood } from "../../Shared/Domain/ValueObject/Address/Neighborhood";
import { Reference } from "../../Shared/Domain/ValueObject/Address/Reference";
import { State } from "../../Shared/Domain/ValueObject/Address/State";
import { Street } from "../../Shared/Domain/ValueObject/Address/Street";
import { AcademicInstitution } from "../../Shared/Domain/ValueObject/EducationalData/AcademicInstitution";
import { EnglishCertificate } from "../../Shared/Domain/ValueObject/EducationalData/EnglishCertificate";
import { Birthdate } from "../../Shared/Domain/ValueObject/PersonalData/Birthdate";
import { Cellphone } from "../../Shared/Domain/ValueObject/PersonalData/Cellphone";
import { Dni } from "../../Shared/Domain/ValueObject/PersonalData/Dni";
import { Email } from "../../Shared/Domain/ValueObject/PersonalData/Email";
import { FirstName } from "../../Shared/Domain/ValueObject/PersonalData/FirstName";
import { Phone } from "../../Shared/Domain/ValueObject/PersonalData/Phone";
import { Surname } from "../../Shared/Domain/ValueObject/PersonalData/Surname";
import { Uuid } from "../../Shared/Domain/ValueObject/Primitives/Uuid";
import { Workplace } from "../../Shared/Domain/ValueObject/Workplace/Workplace";
import { Address } from "../Domain/Address";
import { IStudentRepository } from "../Domain/IStudentRepository";
import { LegalRepresentative } from "../Domain/LegalRepresentative";
import { Student } from "../Domain/Student";
import { Comment } from "../Domain/ValueObject/Comment";
import { StudentUpdateRequest } from "./Dto/StudentUpdateRequest";

export class StudentUpdater {
  private repository: IStudentRepository;

  constructor(repository: IStudentRepository) {
    this.repository = repository;
  }
  public async run(request: StudentUpdateRequest): Promise<DomainResponse> {
    const legalRepresentative = new LegalRepresentative(
      new FirstName(
        request.legalRepresentativeName,
        LegalRepresentative.getDomainTag()
      ),
      new Surname(
        request.legalRepresentativeSurname,
        LegalRepresentative.getDomainTag()
      ),
      new Surname(
        request.legalRepresentativeSecondSurname,
        LegalRepresentative.getDomainTag(),
        true
      ),
      new Phone(
        request.legalRepresentativePhone,
        LegalRepresentative.getDomainTag(),
        true
      ),
      new Cellphone(
        request.legalRepresentativeCellphone,
        LegalRepresentative.getDomainTag(),
        true
      )
    );

    const address = new Address(
      new Uuid(request.studentAddressId, Address.getDomainTag()),
      new Street(request.studentAddressStreet, Address.getDomainTag()),
      new Neighborhood(
        request.studentAddressNeighborhood,
        Address.getDomainTag()
      ),
      new City(request.studentAddressCity, Address.getDomainTag()),
      new State(request.studentAddressState, Address.getDomainTag()),
      new Reference(request.studentAddressReference, Address.getDomainTag())
    );

    const student = new Student(
      this.repository,
      new Uuid(request.studentId, Student.getDomainTag()),
      new Dni(request.studentDni, Student.getDomainTag()),
      new FirstName(request.studentName, Student.getDomainTag()),
      new Surname(request.studentSurname, Student.getDomainTag()),
      new Surname(request.studentSecondSurname, Student.getDomainTag(), true),
      new Email(request.studentEmail, Student.getDomainTag()),
      new Phone(request.studentPhone, Student.getDomainTag()),
      new Birthdate(request.studentBirthdate, Student.getDomainTag()),
      new Cellphone(request.studentCellphone, Student.getDomainTag()),
      new AcademicInstitution(
        request.studentAcademicInstitution,
        Student.getDomainTag()
      ),
      new Workplace(request.studentWorkplace, Student.getDomainTag()),
      new EnglishCertificate(
        request.studentEnglishCertification,
        request.studentIsOtherEnglishCertification,
        Student.getDomainTag()
      ),
      new Comment(request.studentComment, Student.getDomainTag()),
      address,
      legalRepresentative
    );

    return await student.update();
  }
}