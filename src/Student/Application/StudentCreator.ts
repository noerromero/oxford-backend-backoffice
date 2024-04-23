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
import { StudentCreateRequest } from "./Dto/StudentCreateRequest";
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
import { ApplicationResponse } from "../../Shared/Application/ApplicationResponse";
import { DomainResponse } from "../../Shared/Domain/DomainResponse";
import { ApplicationBase } from "../../Shared/Application/ApplicationBase";

export class StudentCreator extends ApplicationBase {
  private repository: IStudentRepository;

  constructor(repository: IStudentRepository) {
    super();
    this.repository = repository;
  }

  async run(request: StudentCreateRequest): Promise<ApplicationResponse> {
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
        Address.getDomainTag(),
        true
      ),
      new City(request.studentAddressCity, Address.getDomainTag()),
      new State(request.studentAddressState, Address.getDomainTag()),
      new Reference(
        request.studentAddressReference,
        Address.getDomainTag(),
        true
      )
    );

    const student = new Student(
      this.repository,
      new Uuid(request.studentId, Student.getDomainTag()),
      new Dni(request.studentDni, Student.getDomainTag()),
      new FirstName(request.studentName, Student.getDomainTag()),
      new Surname(request.studentSurname, Student.getDomainTag()),
      new Surname(
        request.studentSecondSurname,
        Student.getDomainTag(),
        true
      ),
      new Email(request.studentEmail, Student.getDomainTag(), true),
      new Phone(request.studentPhone, Student.getDomainTag(), true),
      new Birthdate(request.studentBirthdate, Student.getDomainTag()),
      new Cellphone(
        request.studentCellphone,
        Student.getDomainTag(),
        true
      ),
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
    const domainResponse = await student.create();
    return this.handleApplicationResponse(domainResponse);
  }

  protected handleApplicationResponse(domainResponse: DomainResponse): ApplicationResponse {
    let message = "Student created successfully";
    if (!domainResponse.success) {
      message = "Something went wrong creating student";
    }
    return new ApplicationResponse(domainResponse.success, message, domainResponse.data);
  }
}
