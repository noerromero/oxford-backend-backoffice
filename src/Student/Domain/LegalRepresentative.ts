import { Cellphone } from "../../Shared/Domain/ValueObject/PersonalData/Cellphone";
import { FirstName } from "../../Shared/Domain/ValueObject/PersonalData/FirstName";
import { Phone } from "../../Shared/Domain/ValueObject/PersonalData/Phone";
import { Surname } from "../../Shared/Domain/ValueObject/PersonalData/Surname";
import { ValueObjectBase } from "../../Shared/Domain/ValueObjectBase";
import { Student } from "./Student";

export class LegalRepresentative extends ValueObjectBase {
  protected name: FirstName;
  protected surname: Surname;
  protected secondSurname: Surname;
  protected phone: Phone;
  protected cellphone: Cellphone;

  //#regiont Constructors
  private constructor(
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

  public static create(
    name: string,
    surname: string,
    secondSurname: string,
    phone: string,
    cellphone: string
  ): LegalRepresentative {
    return new LegalRepresentative(
      new FirstName(name, Student.tag()),
      new Surname(surname, Student.tag()),
      new Surname(secondSurname, Student.tag(), true),
      new Phone(phone, Student.tag(), true),
      new Cellphone(cellphone, Student.tag(), true)
    );
  }

  public static fromPrimitives(plainData: {
    name: string;
    surname: string;
    secondSurname: string;
    phone: string;
    cellphone: string;
  }) : LegalRepresentative {
    return new LegalRepresentative(
      new FirstName(plainData.name, LegalRepresentative.tag()),
      new Surname(plainData.surname, LegalRepresentative.tag()),
      new Surname(plainData.secondSurname, LegalRepresentative.tag(), true),
      new Phone(plainData.phone, LegalRepresentative.tag(), true),
      new Cellphone(plainData.cellphone, LegalRepresentative.tag(), true)
    );
  }
  //#endregion Constructors

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
      new FirstName("", LegalRepresentative.tag()),
      new Surname("", LegalRepresentative.tag()),
      new Surname("", LegalRepresentative.tag()),
      new Phone("", LegalRepresentative.tag()),
      new Cellphone("", LegalRepresentative.tag())
    );
  }

  static tag(): string {
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
