import { ValueObject } from "./ValueObject";

export abstract class StringValueObject extends ValueObject<string> {
  public shouldBeValidated(): boolean {
    if (this.isOptional && this.value === "") {
      return false;
    }
    return true;
  }
}
