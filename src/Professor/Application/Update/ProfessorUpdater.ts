import { ApplicationBase } from "../../../Shared/Application/ApplicationBase";
import { ApplicationResponse } from "../../../Shared/Application/ApplicationResponse";
import { DomainResponse } from "../../../Shared/Domain/DomainResponse";
import { IProfessorRepository } from "../../Domain/IProfessorRepository";
import { Professor } from "../../Domain/Professor";
import { ProfessorUpdateRequest } from "./ProfessorUpdateRequest";

export class ProfessorUpdater extends ApplicationBase {
    private repository: IProfessorRepository;
  
    constructor(repository: IProfessorRepository) {
      super();
      this.repository = repository;
    }
    public async run(
      request: ProfessorUpdateRequest
    ): Promise<ApplicationResponse> {
  
      const professor = Professor.create(
        request.id,
        request.dni,
        request.name,
        request.surname,
        request.secondSurname,
        request.email,
        request.birthday,
        request.cellphone,
      );
  
      professor.setRepository(this.repository);
  
      const domainResponse = await professor.update();
      return this.handleApplicationResponse(domainResponse);
    }
  
    protected handleApplicationResponse(
      domainResponse: DomainResponse
    ): ApplicationResponse {
      let message = "Professor updated successfully";
      if (!domainResponse.success) {
        message = "Something went wrong updating professor";
      }
      return new ApplicationResponse(
        domainResponse.success,
        message,
        domainResponse.data
      );
    }
  }
  