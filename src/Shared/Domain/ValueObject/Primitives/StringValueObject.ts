import { ValueObject } from "./ValueObject";

export abstract class StringValueObject extends ValueObject<string> {
  constructor(value: string, isOptional: boolean = false) {
    super(value, isOptional);
    this.checkIfItIsEmpty();
  }

  public shouldBeValidated(): boolean {
    if (this.isOptional && this.value === "") {
      return false;
    }
    return true;
  }

  protected checkIfItIsEmpty(): void {
    this.setEmpty(this.value === "" || this.value === null || this.value === undefined);
  }
}
