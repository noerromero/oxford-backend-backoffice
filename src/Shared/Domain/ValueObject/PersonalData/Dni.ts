import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";
import { StringValueObject } from "../Primitives/StringValueObject";

export class Dni extends StringValueObject {
  constructor(value: string, ownerEntity: string, isOptional: boolean = false) {
    super(value, ownerEntity, isOptional);
    if (!this.hasValidFormat(value)) {
      this.addDomainError(
        new InvalidArgumentException(
          this.formatErrorMessage(`DNI ${value} is invalid`)
        )
      );
    }
  }

  protected hasValidFormat(value: string): boolean {
    const pattern = /^[0-9]{8}$/;
    return pattern.test(value);
  }
}
