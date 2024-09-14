import { ApplicationBase } from "../../../Shared/Application/ApplicationBase";
import { ApplicationResponse } from "../../../Shared/Application/ApplicationResponse";
import { DomainResponse } from "../../../Shared/Domain/DomainResponse";
import { Course } from "../../Domain/Course";
import { ICourseRepository } from "../../Domain/ICourseRepository";

export class CourseSearcherAll extends ApplicationBase {
  private repository: ICourseRepository;

  constructor(repository: ICourseRepository) {
    super();
    this.repository = repository;
  }

  public async run(): Promise<ApplicationResponse> {
    let professor = Course.create();

    professor.setRepository(this.repository);

    const domainResponse = await professor.searchAll();
    return this.handleApplicationResponse(domainResponse);
  }

  protected handleApplicationResponse(
    domainResponse: DomainResponse
  ): ApplicationResponse {
    if (!domainResponse.success) {
      return new ApplicationResponse(
        domainResponse.success,
        "Something went wrong searching courses",
        domainResponse.data
      );
    }

    return new ApplicationResponse(
      domainResponse.success,
      "Courses searched successfully",
      domainResponse.data
    );
  }
}
