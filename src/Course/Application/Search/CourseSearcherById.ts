import { ApplicationBase } from "../../../Shared/Application/ApplicationBase";
import { ApplicationResponse } from "../../../Shared/Application/ApplicationResponse";
import { DomainResponse } from "../../../Shared/Domain/DomainResponse";
import { Course } from "../../Domain/Course";
import { ICourseRepository } from "../../Domain/ICourseRepository";

export class CourseSearcherById extends ApplicationBase {
    private repository: ICourseRepository;

    constructor(repository: ICourseRepository) {
        super();
        this.repository = repository;
    }

    public async run(id: string): Promise<ApplicationResponse> {
        let course = Course.create(id);
  
      course.setRepository(this.repository);
  
      const domainResponse = await course.searchById();
      return this.handleApplicationResponse(domainResponse);
    }

    protected handleApplicationResponse(
        domainResponse: DomainResponse
      ): ApplicationResponse {
        if (!domainResponse.success) {
          return new ApplicationResponse(
            domainResponse.success,
            "Something went wrong searching course",
            domainResponse.data
          );
        }
    
        return new ApplicationResponse(
          domainResponse.success,
          "Course found successfully",
          domainResponse.data
        );
      }
}