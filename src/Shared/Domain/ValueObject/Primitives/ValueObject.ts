import { DomainBase } from "../../DomainBase";
import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";

export type Primitives = String | string | number | Boolean | boolean | Date;

export abstract class ValueObject<T extends Primitives> extends DomainBase {
  protected readonly value: T;
  protected readonly isOptional: boolean;

  constructor(value: T, isOptional: boolean = false) {
    super();
    this.ensureValueIsDefined(value);
    this.value = value;
    this.isOptional = isOptional;
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      this.addDomainError(
        new InvalidArgumentException("Value must be defined")
      );
    }
  }

  public equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    );
  }

  public toString(): string {
    return this.value.toString();
  }
}
