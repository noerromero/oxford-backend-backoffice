import { DomainResponse } from "../Domain/DomainResponse";
import { ApplicationResponse } from "./ApplicationResponse";

export abstract class ApplicationBase {
  protected abstract handleApplicationResponse(
    domainResponse: DomainResponse
  ): ApplicationResponse;
}
