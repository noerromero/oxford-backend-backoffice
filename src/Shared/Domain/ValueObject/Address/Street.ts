import { StringValueObject } from "../Primitives/StringValueObject";
import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";

export class Street extends StringValueObject {
  constructor(value: string, ownerEntity: string, isOptional: boolean = false) {
    super(value, ownerEntity, isOptional);
    if (!this.hasValidFormat(value)) {
      this.addDomainError(
        new InvalidArgumentException(
          this.formatErrorMessage(`Street ${value} is invalid`)
        )
      );
    }
  }

  protected hasValidFormat(value: string): boolean {
    if (!this.shouldBeValidated()) {
      return true;
    }
    return value.length > 0 && value.length <= 200;
  }
}
