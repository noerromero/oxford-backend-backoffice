import { DomainResponse } from "../../../Shared/Domain/DomainResponse";
import { IStudentRepository } from "../../Domain/IStudentRepository";
import { Student } from "../../Domain/Student";
import { ApplicationBase } from "../../../Shared/Application/ApplicationBase";
import { ApplicationResponse } from "../../../Shared/Application/ApplicationResponse";

export class StudentSearcherAll extends ApplicationBase{

    private repository: IStudentRepository;

    constructor(repository: IStudentRepository) {
        super();
        this.repository = repository;
    }

    public async run() {
        let student = Student.create();

        student.setRepository(this.repository);

    const domainResponse = await student.searchAll();
    return this.handleApplicationResponse(domainResponse);
    }

    protected handleApplicationResponse(
        domainResponse: DomainResponse
      ): ApplicationResponse {
        if (!domainResponse.success) {
          return new ApplicationResponse(
            domainResponse.success,
            "Something went wrong searching students",
            domainResponse.data
          );
        }
    
        return new ApplicationResponse(
          domainResponse.success,
          "Students found successfully",
          domainResponse.data
        );
      }
}