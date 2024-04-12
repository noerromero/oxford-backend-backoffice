import { StringValueObject } from "../Primitives/StringValueObject";
import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";

export class Email extends StringValueObject {
  constructor(value: string, ownerEntity: string, isOptional: boolean = false) {
    super(value, ownerEntity, isOptional);
    if (!this.hasValidFormat(value)) {
      this.addDomainError(
        new InvalidArgumentException(
          this.formatErrorMessage(`Email ${value} is invalid`)
        )
      );
    }
  }

  protected hasValidFormat(value: string): boolean {
    if (!this.shouldBeValidated()) {
      return true;
    }
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(value);
  }
}
