import { ApplicationBase } from "../../../Shared/Application/ApplicationBase";
import { ApplicationResponse } from "../../../Shared/Application/ApplicationResponse";
import { DomainResponse } from "../../../Shared/Domain/DomainResponse";
import { IProfessorRepository } from "../../Domain/IProfessorRepository";
import { Professor } from "../../Domain/Professor";

export class ProfessorRemover extends ApplicationBase {
    private repository: IProfessorRepository;
  
    constructor(repository: IProfessorRepository) {
      super();
      this.repository = repository;
    }
  
    public async run(id: string): Promise<ApplicationResponse> {
      let professor = Professor.create(id);
  
      professor.setRepository(this.repository);
  
      const domainResponse = await professor.delete();
      return this.handleApplicationResponse(domainResponse);
    }
  
    protected handleApplicationResponse(
      domainResponse: DomainResponse
    ): ApplicationResponse {
      if (!domainResponse.success) {
        return new ApplicationResponse(
          domainResponse.success,
          "Something went wrong removing professor",
          domainResponse.data
        );
      }
  
      return new ApplicationResponse(
        domainResponse.success,
        "Professor removed successfully",
        domainResponse.data
      );
    }
  }
  