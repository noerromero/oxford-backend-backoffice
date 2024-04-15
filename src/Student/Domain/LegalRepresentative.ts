import { EntityBase } from "../../Shared/Domain/EntityBase";
import { Cellphone } from "../../Shared/Domain/ValueObject/PersonalData/Cellphone";
import { FirstName } from "../../Shared/Domain/ValueObject/PersonalData/FirstName";
import { Phone } from "../../Shared/Domain/ValueObject/PersonalData/Phone";
import { Surname } from "../../Shared/Domain/ValueObject/PersonalData/Surname";
import { Uuid } from "../../Shared/Domain/ValueObject/Primitives/Uuid";

export class LegalRepresentative extends EntityBase<Uuid> {
  protected name: FirstName;
  protected surname: Surname;
  protected secondSurname: Surname;
  protected phone: Phone;
  protected cellphone: Cellphone;
  protected studentId: Uuid;

  constructor(
    id: Uuid,
    name: FirstName,
    surname: Surname,
    secondSurname: Surname,
    phone: Phone,
    cellphone: Cellphone,
    studentId: Uuid
  ) {
    super(id);
    this.name = name;
    this.surname = surname;
    this.secondSurname = secondSurname;
    this.phone = phone;
    this.cellphone = cellphone;
    this.studentId = studentId;
    this.checkIfItIsEmpty();
  }

  public getId(): Uuid {
    return this.id;
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

  public getStudentId(): Uuid {
    return this.studentId;
  }

  public recoverCommonDomainErrors(): void {
    if (this.isEmpty()) return;

    this.addDomainErrors(this.id.getDomainErrors());
    this.addDomainErrors(this.name.getDomainErrors());
    this.addDomainErrors(this.surname.getDomainErrors());
    this.addDomainErrors(this.secondSurname.getDomainErrors());
    this.addDomainErrors(this.phone.getDomainErrors());
    this.addDomainErrors(this.cellphone.getDomainErrors());
    this.addDomainErrors(this.studentId.getDomainErrors());
  }

  protected checkIfItIsEmpty(): void {
    this.setEmpty(
      this.id.isEmpty() &&
        this.name.isEmpty() &&
        this.surname.isEmpty() &&
        this.secondSurname.isEmpty() &&
        this.phone.isEmpty() &&
        this.cellphone.isEmpty()
    );
  }

  public static getEmptyObject(): LegalRepresentative {
    return new LegalRepresentative(
      new Uuid("", LegalRepresentative.getEntityName()),
      new FirstName("", LegalRepresentative.getEntityName()),
      new Surname("", LegalRepresentative.getEntityName()),
      new Surname("", LegalRepresentative.getEntityName()),
      new Phone("", LegalRepresentative.getEntityName()),
      new Cellphone("", LegalRepresentative.getEntityName()),
      new Uuid("", LegalRepresentative.getEntityName())
    );
  }

  static getEntityName(): string {
    return "Legal Representative";
  }
}
