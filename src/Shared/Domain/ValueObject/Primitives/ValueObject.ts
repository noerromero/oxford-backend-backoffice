import { DomainBase } from "../../DomainBase";
import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";

export type Primitives = String | string | number | Boolean | boolean | Date;

export abstract class ValueObject<T extends Primitives> extends DomainBase {
  protected readonly value: T;
  protected readonly isOptional: boolean;
  protected readonly ownerEntity: string;

  constructor(value: T, ownerEntity: string, isOptional: boolean = false) {
    super();
    this.ownerEntity = ownerEntity;
    this.value = value;
    this.isOptional = isOptional;
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      this.addDomainError(
        new InvalidArgumentException(
          this.formatErrorMessage("Value must be defined")
        )
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

  public getValue(): T {
    return this.value;
  }

  protected formatErrorMessage(error: string): string {
    return this.ownerEntity + " - " + error;
  }
}
