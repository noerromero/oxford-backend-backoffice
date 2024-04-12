import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";
import { StringValueObject } from "../Primitives/StringValueObject";

export class Cellphone extends StringValueObject {
  constructor(
    value: string,
    ownerEntity: string,
    isOptional: boolean = false
  ) {
    super(value, ownerEntity, isOptional);
    if (!this.hasValidFormat(value)) {
      this.addDomainError(
        new InvalidArgumentException(
          this.formatErrorMessage(`Cellphone ${value} is invalid`)
        )
      );
    }
  }

  protected hasValidFormat(value: string): boolean {
    if (!this.shouldBeValidated()) {
      return true;
    }
    const pattern = /^[0-9]{9}$/;
    return pattern.test(value);
  }
}
