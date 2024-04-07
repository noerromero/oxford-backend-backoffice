import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";
import { StringValueObject } from "../Primitives/StringValueObject";

export class EnglishCertificate extends StringValueObject {
  public static readonly FCE = "FCE";
  public static readonly CPE = "CPE";
  public static readonly PET = "PET";
  public static readonly CAE = "CAE";
  public static readonly KET = "KET";

  private readonly isOther: boolean;

  constructor(value: string, isOther: boolean, isOptional: boolean = false) {
    super(value, isOptional);
    this.isOther = isOther;
    if (!this.hasValidLenght()) {
      this.addDomainError(
        new InvalidArgumentException(
          "English certification must have a valid length"
        )
      );
    }
    if (!this.hasValidValue()) {
      this.addDomainError(
        new InvalidArgumentException("English certification value is not valid")
      );
    }
  }

  protected hasValidLenght(): boolean {
    return this.value.length > 0 && this.value.length <= 100;
  }

  protected hasValidValue(): boolean {
    if (this.isOther) {
      return (
        this.value !== EnglishCertificate.FCE &&
        this.value !== EnglishCertificate.CPE &&
        this.value !== EnglishCertificate.PET &&
        this.value !== EnglishCertificate.CAE &&
        this.value !== EnglishCertificate.KET
      );
    }

    return (
      this.value === EnglishCertificate.FCE ||
      this.value === EnglishCertificate.CPE ||
      this.value === EnglishCertificate.PET ||
      this.value === EnglishCertificate.CAE ||
      this.value === EnglishCertificate.KET
    );
  }
}
