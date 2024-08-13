import { InvalidArgumentException } from "../../DomainException/InvalidArgumentException";
import { StringValueObject } from "../Primitives/StringValueObject";

export class EnglishCertificate extends StringValueObject {
  public static readonly FCE = "FCE";
  public static readonly CPE = "CPE";
  public static readonly PET = "PET";
  public static readonly CAE = "CAE";
  public static readonly KET = "KET";

  private readonly isOther: boolean;

  constructor(value: string, ownerEntity: string, isOptional: boolean = false) {
    super(value, ownerEntity, isOptional);
    
    if (!this.hasValidLenght()) {
      this.addDomainError(
        new InvalidArgumentException(
          this.formatErrorMessage(
            "English certificate must have a valid length"
          )
        )
      );
    }
    this.isOther = this.isAKnownCertificate();
  }

  public isOtherCertificate(): boolean {
    return this.isOther;
  }

  protected hasValidLenght(): boolean {
    if (!this.shouldBeValidated()) {
      return true;
    }
    return this.value.length > 0 && this.value.length <= 100;
  }

  protected isAKnownCertificate(): boolean {
    return (
      this.value === EnglishCertificate.FCE ||
      this.value === EnglishCertificate.CPE ||
      this.value === EnglishCertificate.PET ||
      this.value === EnglishCertificate.CAE ||
      this.value === EnglishCertificate.KET
    );
  }
}
