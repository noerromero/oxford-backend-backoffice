import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";
import { ValueObject } from "./ValueObject";
export abstract class DateValueObject extends ValueObject<Date> {
  protected input: string;

  constructor(input: string, isOptional: boolean = false, customMessageError: string = "") {
    const date = input !== "" ? new Date(input) : new Date(0);
    super(date, isOptional);
    this.input = input;
    if (!this.hasValidFormat()) {
      this.addDomainError(
        new InvalidArgumentException(customMessageError === "" ? "Invalid date format" : customMessageError)
      );
    }
    this.checkIfItIsEmpty();
  }

  protected hasValidFormat(): boolean {
    if (!this.shouldBeValidated()) {
      return true;
    }

    const pattern = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!pattern.test(this.input)) {
      return false;
    }
    return true;
  }

  public shouldBeValidated(): boolean {
    if (this.isOptional && this.input === "") {
      return false;
    }
    return true;
  }

  protected checkIfItIsEmpty(): void {
    this.setEmpty(this.input === "" || this.input === null || this.input === undefined);
  }

  public getYear(): number {
    return this.value.getFullYear();
  }

  public getMonth(): number { 
    return this.value.getMonth();
  }
}
