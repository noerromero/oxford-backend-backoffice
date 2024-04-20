import { Cellphone } from "../../Shared/Domain/ValueObject/PersonalData/Cellphone";
import { FirstName } from "../../Shared/Domain/ValueObject/PersonalData/FirstName";
import { Phone } from "../../Shared/Domain/ValueObject/PersonalData/Phone";
import { Surname } from "../../Shared/Domain/ValueObject/PersonalData/Surname";
import { Uuid } from "../../Shared/Domain/ValueObject/Primitives/Uuid";
import { ValueObjectBase } from "../../Shared/Domain/ValueObjectBase";

export class LegalRepresentative extends ValueObjectBase {
  protected name: FirstName;
  protected surname: Surname;
  protected secondSurname: Surname;
  protected phone: Phone;
  protected cellphone: Cellphone;

  constructor(
    name: FirstName,
    surname: Surname,
    secondSurname: Surname,
    phone: Phone,
    cellphone: Cellphone,
    isOptional: boolean = false
  ) {
    super(isOptional);
    this.name = name;
    this.surname = surname;
    this.secondSurname = secondSurname;
    this.phone = phone;
    this.cellphone = cellphone;
    this.checkIfItIsEmpty();
  }

  public getName(): FirstName {
    return this.name;
  }

  public getSurname(): Surname {
    return this.surname;
  }

  public getSecondSurname(): Surname {
    return this.secondSurname;
  }

  public getPhone(): Phone {
    return this.phone;
  }

  public getCellphone(): Cellphone {
    return this.cellphone;
  }

  public recoverCommonDomainErrors(): void {
    if (this.isEmpty()) return;

    this.addDomainErrors(this.name.getDomainErrors());
    this.addDomainErrors(this.surname.getDomainErrors());
    this.addDomainErrors(this.secondSurname.getDomainErrors());
    this.addDomainErrors(this.phone.getDomainErrors());
    this.addDomainErrors(this.cellphone.getDomainErrors());
  }

  protected checkIfItIsEmpty(): void {
    this.setEmpty(
      this.name.isEmpty() &&
        this.surname.isEmpty() &&
        this.secondSurname.isEmpty() &&
        this.phone.isEmpty() &&
        this.cellphone.isEmpty()
    );
  }

  public static getEmptyObject(): LegalRepresentative {
    return new LegalRepresentative(
      new FirstName("", LegalRepresentative.getDomainTag()),
      new Surname("", LegalRepresentative.getDomainTag()),
      new Surname("", LegalRepresentative.getDomainTag()),
      new Phone("", LegalRepresentative.getDomainTag()),
      new Cellphone("", LegalRepresentative.getDomainTag())
    );
  }

  static getDomainTag(): string {
    return "Legal Representative";
  }

  public shouldBeValidated(): boolean {
    if (this.isOptional && this.isEmpty()) {
      return false;
    }
    return true;
  }

  public equals(other: LegalRepresentative): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.name === this.name &&
      other.surname === this.surname &&
      other.secondSurname === this.secondSurname &&
      other.phone === this.phone &&
      other.cellphone === this.cellphone
    );
  }

  public toString(): string {
    return `${this.name.toString()} ${this.surname.toString()} ${this.secondSurname.toString()}`;
  }
}
