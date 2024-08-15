import { InvalidArgumentException } from "../../../Shared/Domain/DomainException/InvalidArgumentException";
import { StringValueObject } from "../../../Shared/Domain/ValueObject/Primitives/StringValueObject";

export class Comment extends StringValueObject {
  constructor(value: string, ownerEntity: string, isOptional: boolean = false) {
    super(value, ownerEntity, isOptional);
    if (!this.hasValidLenght()) {
      this.addDomainError(
        new InvalidArgumentException(
          this.formatErrorMessage("Comment must have a valid length")
        )
      );
    }
  }

  protected hasValidLenght(): boolean {
    if (!this.shouldBeValidated()) {
      return true;
    }
    return this.value.length > 0 && this.value.length <= 1000;
  }
}
