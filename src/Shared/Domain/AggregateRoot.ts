import { EntityBase } from "./EntityBase";

export abstract class AggregateRoot<TId> extends EntityBase<TId> {
  protected repository: any;

  constructor(respository: any, id: TId) {
    super(id);
    if (!respository) throw new Error("Repository is required");
    this.repository = respository;
  }
}
