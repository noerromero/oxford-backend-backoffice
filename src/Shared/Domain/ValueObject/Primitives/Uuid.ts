import { v4 as uuid } from "uuid";
import validate from "uuid-validate";
import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";
import { ValueObject } from "./ValueObject";

export class Uuid extends ValueObject<string> {
  constructor(value: string, ownerEntity: string, isOptional: boolean = false) {
    super(value, ownerEntity, isOptional);
    this.ensureIsValidUuid(value);
    this.checkIfItIsEmpty();
  }

  static random(): Uuid {
    return new Uuid(uuid(), "");
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      this.addDomainError(
        new InvalidArgumentException(
          this.formatErrorMessage(
            `<${this.constructor.name}> does not allow the value <${id}>`
          )
        )
      );
    }
  }

  protected checkIfItIsEmpty(): void {
    this.setEmpty(
      this.value === "" || this.value === null || this.value === undefined
    );
  }
}
