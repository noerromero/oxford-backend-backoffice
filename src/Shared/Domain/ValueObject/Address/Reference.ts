import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";
import { StringValueObject } from "../Primitives/StringValueObject";

export class Reference extends StringValueObject {
  constructor(value: string, isOptional: boolean = false) {
    super(value, isOptional);
    if (!this.hasValidLenght(value)) {
      this.addDomainError(
        new InvalidArgumentException("Reference must have a valid length")
      );
    }
  }

  protected hasValidLenght(value: string): boolean {
    if (!this.shouldBeValidated()) {
        return true;
      }
    return value.length > 0 && value.length <= 200;
  }
}