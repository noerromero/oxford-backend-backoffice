import { StringValueObject } from "../Primitives/StringValueObject";
import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";

export class Phone extends StringValueObject {
  constructor(value: string, isOptional: boolean = false) {
    super(value, isOptional);
    if (!this.hasValidFormat(value)) {
      this.addDomainError(
        new InvalidArgumentException(`Phone ${value} is invalid`)
      );
    }
  }

  protected hasValidFormat(value: string): boolean {
    if (!this.shouldBeValidated()) {
      return true;
    }
    const pattern = /^[0-9]{0,9}$/;
    return pattern.test(value);
  }
}
