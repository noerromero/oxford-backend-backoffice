export abstract class DomainBase {
  private domainErrors: Array<Error>;

  constructor() {
    this.domainErrors = [];
  }

  public getDomainErrors(): Array<Error> {
    return this.domainErrors;
  }

  public addDomainError(error: Error): void {
    this.domainErrors.push(error);
  }

  public addDomainErrors(errors: Array<Error>): void {
    this.domainErrors.push(...errors);
  }

  public hasDomainErrors(): boolean {
    return this.domainErrors.length > 0;
  }
  
  public toStringArray(): Array<string> {
    return this.domainErrors.map((error) => error.message);
  }
}