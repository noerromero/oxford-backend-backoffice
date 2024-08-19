import { ApplicationBase } from "../../../Shared/Application/ApplicationBase";
import { ApplicationResponse } from "../../../Shared/Application/ApplicationResponse";
import { DomainResponse } from "../../../Shared/Domain/DomainResponse";
import { Address } from "../../Domain/Address";
import { IStudentRepository } from "../../Domain/IStudentRepository";
import { LegalRepresentative } from "../../Domain/LegalRepresentative";
import { Student } from "../../Domain/Student";
import { StudentUpdateRequest } from "./StudentUpdateRequest";

export class StudentUpdater extends ApplicationBase {
  private repository: IStudentRepository;

  constructor(repository: IStudentRepository) {
    super();
    this.repository = repository;
  }
  public async run(
    request: StudentUpdateRequest
  ): Promise<ApplicationResponse> {
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

    let student = Student.create(
      request.id,
      request.dni,
      request.name,
      request.surname,
      request.secondSurname,
      request.email,
      request.phone,
      request.birthday,
      request.cellphone,
      request.academicInstitution,
      request.workplace,
      request.englishCertificate,
      request.comment,
      address,
      legalRepresentative
    );

    student.setRepository(this.repository);

    const domainResponse = await student.update();
    return this.handleApplicationResponse(domainResponse);
  }

  protected handleApplicationResponse(
    domainResponse: DomainResponse
  ): ApplicationResponse {
    let message = "Student updated successfully";
    if (!domainResponse.success) {
      message = "Something went wrong updating student";
    }
    return new ApplicationResponse(
      domainResponse.success,
      message,
      domainResponse.data
    );
  }
}
