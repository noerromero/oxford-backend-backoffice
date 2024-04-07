import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";
import { StringValueObject } from "../Primitives/StringValueObject";

export class Dni extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (!this.hasValidFormat(value)) {
      this.addDomainError(
        new InvalidArgumentException(`Person ID ${value} is invalid`)
      );
    }
  }

  protected hasValidFormat(value: string): boolean {
    const pattern = /^[0-9]{8}$/;
    return pattern.test(value);
  }
}
