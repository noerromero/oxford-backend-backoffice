import { Student } from "../../Domain/Student";
import { IStudentRepository } from "../../Domain/IStudentRepository";
import { Address } from "../../Domain/Address";
import { StudentCreateRequest } from "./StudentCreateRequest";
import { LegalRepresentative } from "../../Domain/LegalRepresentative";
import { ApplicationResponse } from "../../../Shared/Application/ApplicationResponse";
import { DomainResponse } from "../../../Shared/Domain/DomainResponse";
import { ApplicationBase } from "../../../Shared/Application/ApplicationBase";

export class StudentCreator extends ApplicationBase {
  private repository: IStudentRepository;

  constructor(repository: IStudentRepository) {
    super();
    this.repository = repository;
  }

  async run(request: StudentCreateRequest): Promise<ApplicationResponse> {
    const legalRepresentative = LegalRepresentative.create(
      request.legalRepresentative.name,
      request.legalRepresentative.surname,
      request.legalRepresentative.secondSurname,
      request.legalRepresentative.phone,
      request.legalRepresentative.cellphone
    );

    const address = Address.create(
      request.address.id,
      request.address.street,
      request.address.neighborhood,
      request.address.city,
      request.address.state,
      request.address.reference
    );

    const student = Student.create(
      this.repository,
      request.studentId,
      request.studentDni,
      request.studentName,
      request.studentSurname,
      request.studentSecondSurname,
      request.studentEmail,
      request.studentPhone,
      request.studentBirthdate,
      request.studentCellphone,
      request.studentAcademicInstitution,
      request.studentWorkplace,
      request.studentIsOtherEnglishCertification,
      request.studentEnglishCertification,
      request.studentComment,
      address,
      legalRepresentative
    );

    const domainResponse = await student.create();
    return this.handleApplicationResponse(domainResponse);
  }

  protected handleApplicationResponse(
    domainResponse: DomainResponse
  ): ApplicationResponse {
    let message = "Student created successfully";
    if (!domainResponse.success) {
      message = "Something went wrong creating student";
    }
    return new ApplicationResponse(
      domainResponse.success,
      message,
      domainResponse.data
    );
  }
}
