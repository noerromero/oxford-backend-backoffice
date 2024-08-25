import { ApplicationBase } from "../../../Shared/Application/ApplicationBase";
import { ApplicationResponse } from "../../../Shared/Application/ApplicationResponse";
import { DomainResponse } from "../../../Shared/Domain/DomainResponse";
import { IProfessorRepository } from "../../Domain/IProfessorRepository";
import { Professor } from "../../Domain/Professor";
import { ProfessorCreateRequest } from "./ProfessorCreateRequest";

export class ProfessorCreator extends ApplicationBase  {
    
    private repository: IProfessorRepository;

    constructor(repository: IProfessorRepository) {
      super();
      this.repository = repository;
    }

    async run(request: ProfessorCreateRequest): Promise<ApplicationResponse> {
        const professor = Professor.create(
          request.id,
          request.dni,
          request.name,
          request.surname,
          request.secondSurname,
          request.email,
          request.birthday,
          request.cellphone
        );
    
        professor.setRepository(this.repository);
    
        const domainResponse = await professor.create();
        return this.handleApplicationResponse(domainResponse);
      }

      protected handleApplicationResponse(
        domainResponse: DomainResponse
      ): ApplicationResponse {
        let message = "Professor created successfully";
        if (!domainResponse.success) {
          message = "Something went wrong creating professor";
        }
        return new ApplicationResponse(
          domainResponse.success,
          message,
          domainResponse.data
        );
      }
}