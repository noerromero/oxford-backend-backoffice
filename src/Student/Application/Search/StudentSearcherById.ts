import { ApplicationBase } from "../../../Shared/Application/ApplicationBase";
import { ApplicationResponse } from "../../../Shared/Application/ApplicationResponse";
import { DomainResponse } from "../../../Shared/Domain/DomainResponse";
import { IStudentRepository } from "../../Domain/IStudentRepository";
import { Student } from "../../Domain/Student";

export class StudentSearcherById extends ApplicationBase {
  private repository: IStudentRepository;

  constructor(repository: IStudentRepository) {
    super();
    this.repository = repository;
  }

  public async run(id: string): Promise<ApplicationResponse> {
    let student = Student.createForSearchById(id);

    student.setRepository(this.repository);

    const domainResponse = await student.searchById();
    return this.handleApplicationResponse(domainResponse);
  }

  protected handleApplicationResponse(
    domainResponse: DomainResponse
  ): ApplicationResponse {
    if (!domainResponse.success) {
      return new ApplicationResponse(
        domainResponse.success,
        "Something went wrong searching student",
        domainResponse.data
      );
    }

    return new ApplicationResponse(
      domainResponse.success,
      "Student found successfully",
      domainResponse.data
    );
  }
}
