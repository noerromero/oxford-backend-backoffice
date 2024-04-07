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

  constructor(
    id: Uuid,
    name: FirstName,
    surname: Surname,
    secondSurname: Surname,
    phone: Phone,
    cellphone: Cellphone
  ) {
    super(id);
    this.name = name;
    this.surname = surname;
    this.secondSurname = secondSurname;
    this.phone = phone;
    this.cellphone = cellphone;
    this.checkIfItIsEmpty();
  }

  public recoveryDomainErrors(): void {
    if(this.isEmpty()) return;

    this.addDomainErrors(this.name.getDomainErrors());
    this.addDomainErrors(this.surname.getDomainErrors());
    this.addDomainErrors(this.secondSurname.getDomainErrors());
    this.addDomainErrors(this.phone.getDomainErrors());
    this.addDomainErrors(this.cellphone.getDomainErrors());
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
      new Uuid(""),
      new FirstName(""),
      new Surname(""),
      new Surname(""),
      new Phone(""),
      new Cellphone("")
    );
  }
}
