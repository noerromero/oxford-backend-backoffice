import { DomainBase } from "./DomainBase";
export abstract class ValueObjectBase extends DomainBase {
  protected readonly isOptional: boolean;

  constructor(isOptional: boolean = false) {
    super();
    this.isOptional = isOptional;
  }

  /**
   * shouldBeValidated will contein the logic to know if the value object should be validated
   * Evaluates isOptional param and other considerations depending on the child class
   */
  public abstract shouldBeValidated(): boolean;
  public abstract equals(other: ValueObjectBase): boolean;
  public abstract toString(): string;
}
