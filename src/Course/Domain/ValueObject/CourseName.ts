import { InvalidArgumentException } from "../../../Shared/Domain/DomainException/InvalidArgumentException";
import { StringValueObject } from "../../../Shared/Domain/ValueObject/Primitives/StringValueObject";

export class CourseName extends StringValueObject {
    constructor(value: string, ownerEntity: string, isOptional: boolean = false) {
      super(value, ownerEntity, isOptional);
      if (!this.hasValidLength(value)) {
        this.addDomainError(
          new InvalidArgumentException(
            this.formatErrorMessage(`DNI ${value} is invalid`)
          )
        );
      }
    }

    protected hasValidLength(value: string): boolean {
        if (!this.shouldBeValidated()) {
          return true;
        }
        return value.length > 0 && value.length <= 200;
      }
  }
  