import { ApplicationBase } from "../../../Shared/Application/ApplicationBase";
import { ApplicationResponse } from "../../../Shared/Application/ApplicationResponse";
import { DomainResponse } from "../../../Shared/Domain/DomainResponse";
import { Course } from "../../Domain/Course";
import { ICourseRepository } from "../../Domain/ICourseRepository";
import { CourseUpdateRequest } from "./CourseUpdateRequest";

export class CourseUpdater extends ApplicationBase  {
    
    private repository: ICourseRepository;

    constructor(repository: ICourseRepository) {
      super();
      this.repository = repository;
    }

    async run(request: CourseUpdateRequest): Promise<ApplicationResponse> {
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
        let message = "Course updated successfully";
        if (!domainResponse.success) {
          message = "Something went wrong updating course";
        }
        return new ApplicationResponse(
          domainResponse.success,
          message,
          domainResponse.data
        );
      }
}