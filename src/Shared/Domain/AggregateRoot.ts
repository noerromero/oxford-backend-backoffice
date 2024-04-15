import { EntityBase } from "./EntityBase";

export abstract class AggregateRoot<TId> extends EntityBase<TId> {
  protected repository: any;

  constructor(respository: any, id: TId) {
    super(id);
    this.repository = respository;
  }

  protected abstract recoverCommonDomainErrors(): void;
}
