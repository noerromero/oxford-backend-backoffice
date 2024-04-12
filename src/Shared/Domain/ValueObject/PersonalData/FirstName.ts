import { StringValueObject } from "../Primitives/StringValueObject";
import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";

export class FirstName extends StringValueObject {
  constructor(value: string, ownerEntity: string, isOptional: boolean = false) {
    super(value, ownerEntity, isOptional);
    if (!this.hasValidLenght(value)) {
      this.addDomainError(
        new InvalidArgumentException(
          this.formatErrorMessage(
            this.formatErrorMessage("Person name must have a valid length")
          )
        )
      );
    }
  }

  protected hasValidLenght(value: string): boolean {
    return value.length > 0 && value.length <= 50;
  }
}
