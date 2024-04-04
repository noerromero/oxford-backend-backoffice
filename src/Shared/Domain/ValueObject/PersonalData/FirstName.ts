import { StringValueObject } from "../Primitives/StringValueObject";
import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";

export class FirstName extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (!this.hasValidLenght(value)) {
      this.addDomainError(
        new InvalidArgumentException("Person name must have a valid length")
      );
    }
  }

  protected hasValidLenght(value: string): boolean {
    return value.length > 0 && value.length <= 50;
  }
}
