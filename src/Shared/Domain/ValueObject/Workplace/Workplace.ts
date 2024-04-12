import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";
import { StringValueObject } from "../Primitives/StringValueObject";

export class Workplace extends StringValueObject {
  constructor(value: string, ownerEntity: string, isOptional: boolean = false) {
    super(value, ownerEntity, isOptional);
    if (!this.hasValidLenght(value)) {
      this.addDomainError(
        new InvalidArgumentException(
          this.formatErrorMessage("Workplace must have a valid length")
        )
      );
    }
  }

  protected hasValidLenght(value: string): boolean {
    if (!this.shouldBeValidated()) {
      return true;
    }
    return value.length > 0 && value.length <= 100;
  }
}
