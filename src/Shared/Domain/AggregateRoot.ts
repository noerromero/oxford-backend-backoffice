import { DomainResponse } from "./DomainResponse";
import { EntityBase } from "./EntityBase";

export abstract class AggregateRoot<TId> extends EntityBase<TId> {

  protected repository: any;

  constructor(respository: any, id: TId) {
    super(id);
    this.repository = respository;
  }

  protected abstract recoveryDomainErrors(): void;
  protected abstract handleSave(): Promise<DomainResponse>;

  public async save(): Promise<DomainResponse> {
    this.recoveryDomainErrors();
    if (this.hasDomainErrors()) {
      return Promise.resolve(
        new DomainResponse(
          false,
          this.toStringArray()
        )
      );
    }
    return await this.handleSave();
  }
}
