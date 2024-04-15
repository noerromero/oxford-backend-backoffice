import { DomainBase } from "./DomainBase";

export abstract class EntityBase<TId> extends DomainBase {
  protected id: TId;

  constructor(id: TId) {
    super();
    this.id = id;
  }

  protected abstract recoverCommonDomainErrors(): void;
}
