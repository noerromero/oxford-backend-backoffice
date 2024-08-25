import { ApplicationBase } from "../../../Shared/Application/ApplicationBase";
import { ApplicationResponse } from "../../../Shared/Application/ApplicationResponse";
import { DomainResponse } from "../../../Shared/Domain/DomainResponse";
import { IProfessorRepository } from "../../Domain/IProfessorRepository";
import { Professor } from "../../Domain/Professor";

export class ProfessorSearcherAll extends ApplicationBase{

    private repository: IProfessorRepository;

    constructor(repository: IProfessorRepository) {
        super();
        this.repository = repository;
    }

    public async run() {
        let professor = Professor.create();

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
            "Something went wrong searching professors",
            domainResponse.data
          );
        }
    
        return new ApplicationResponse(
          domainResponse.success,
          "Professors found successfully",
          domainResponse.data
        );
      }
}