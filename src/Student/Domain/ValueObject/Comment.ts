import { InvalidArgumentException } from "../../../Shared/Domain/DomainException/InvalidArgumentException";
import { StringValueObject } from "../../../Shared/Domain/ValueObject/Primitives/StringValueObject";

export class Comment extends StringValueObject {
  constructor(value: string, isOptional: boolean = false) {
    super(value, isOptional);
    if (!this.hasValidLenght()) {
      this.addDomainError(
        new InvalidArgumentException("Comment must have a valid length")
      );
    }
  }

  protected hasValidLenght(): boolean {
    return this.value.length > 0 && this.value.length <= 1000;
  }
}