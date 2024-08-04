import { EntityBase } from "./EntityBase";

export abstract class AggregateRoot<TId> extends EntityBase<TId> {
  protected repository: any;

  constructor(id: TId) {
    super(id);
  }

  public setRepository(repository: any): void {
    this.repository = repository;
  }
}
