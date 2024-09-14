import { ApplicationBase } from "../../../Shared/Application/ApplicationBase";
import { ApplicationResponse } from "../../../Shared/Application/ApplicationResponse";
import { DomainResponse } from "../../../Shared/Domain/DomainResponse";
import { Course } from "../../Domain/Course";
import { ICourseRepository } from "../../Domain/ICourseRepository";
import { CourseCreateRequest } from "./CourseCreateRequest";

export class CourseCreator extends ApplicationBase  {
    
    private repository: ICourseRepository;

    constructor(repository: ICourseRepository) {
      super();
      this.repository = repository;
    }

    async run(request: CourseCreateRequest): Promise<ApplicationResponse> {
        const course = Course.create(
          request.id,
          request.name,
          request.description
        );
    
        course.setRepository(this.repository);
    
        const domainResponse = await course.create();
        return this.handleApplicationResponse(domainResponse);
      }

      protected handleApplicationResponse(
        domainResponse: DomainResponse
      ): ApplicationResponse {
        let message = "Course created successfully";
        if (!domainResponse.success) {
          message = "Something went wrong creating course";
        }
        return new ApplicationResponse(
          domainResponse.success,
          message,
          domainResponse.data
        );
      }
}