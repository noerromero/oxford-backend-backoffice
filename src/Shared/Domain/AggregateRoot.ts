import { EntityBase } from "./EntityBase";

export abstract class AggregateRoot<TId> extends EntityBase<TId> {
  protected repository: any;

  constructor(id: TId) {
    super(id);
  }

  public setRepository(repository: any): void {
    this.repository = repository;
  }

  protected ensureHasRepository(): Array<Error> {
    let domainErrors: Array<Error> = [];
    if (this.repository === null) {
      this.addDomainError(new Error("Repository is required"));
    }
    return domainErrors;
  }
}
