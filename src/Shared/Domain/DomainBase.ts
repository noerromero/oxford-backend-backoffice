export abstract class DomainBase {
  private _isEmpty: boolean;
  private _domainErrors: Array<Error>;

  constructor() {
    this._domainErrors = [];
    this._isEmpty = false;
  }

  protected abstract checkIfItIsEmpty(): void;

  public getDomainErrors(): Array<Error> {
    return this._domainErrors;
  }

  public addDomainError(error: Error): void {
    this._domainErrors.push(error);
  }

  public addDomainErrors(errors: Array<Error>): void {
    this._domainErrors.push(...errors);
  }

  public resetDomainErrors(): void {
    this._domainErrors = [];
  }

  public hasDomainErrors(): boolean {
    return this._domainErrors.length > 0;
  }

  public toStringArray(): Array<string> {
    return this._domainErrors.map((error) => error.message);
  }

  public isEmpty(): boolean {
    return this._isEmpty;
  }

  public setEmpty(isEmpty: boolean): void {
    this._isEmpty = isEmpty;
  }
}
