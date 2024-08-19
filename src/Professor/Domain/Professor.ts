import { Uuid } from '../../Shared/Domain/ValueObject/Primitives/Uuid';
import { FirstName } from '../../Shared/Domain/ValueObject/PersonalData/FirstName';
import { Surname } from '../../Shared/Domain/ValueObject/PersonalData/Surname';
import { Email } from '../../Shared/Domain/ValueObject/PersonalData/Email';
import { Cellphone } from '../../Shared/Domain/ValueObject/PersonalData/Cellphone';
import { Birthday } from '../../Shared/Domain/ValueObject/PersonalData/Birthday';
import { AggregateRoot } from '../../Shared/Domain/AggregateRoot';
import { Dni } from '../../Shared/Domain/ValueObject/PersonalData/Dni';

export class Professor extends AggregateRoot<Uuid> {
  
  private constructor(
    protected id: Uuid,
    protected dni: Dni,
    protected name: FirstName,
    protected surname: Surname,
    protected secondSurname: Surname,
    protected email: Email,
    protected cellphone: Cellphone,
    protected birthday: Birthday
  ) {
    super(id);
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.secondSurname = secondSurname;
    this.email = email;
    this.cellphone = cellphone;
    this.birthday = birthday;
    this.checkIfItIsEmpty();
  }

  protected checkIfItIsEmpty(): void {
    this.setEmpty(
      this.id.isEmpty() &&
        this.dni.isEmpty() &&
        this.name.isEmpty() &&
        this.surname.isEmpty() &&
        this.secondSurname.isEmpty() &&
        this.email.isEmpty() &&
        this.birthday.isEmpty() &&
        this.cellphone.isEmpty()
    );
  }

  protected recoverCommonDomainErrors(): void {
    if (this.isEmpty()) return;

    this.addDomainErrors(this.id.getDomainErrors());
    this.addDomainErrors(this.dni.getDomainErrors());
    this.addDomainErrors(this.name.getDomainErrors());
    this.addDomainErrors(this.surname.getDomainErrors());
    this.addDomainErrors(this.secondSurname.getDomainErrors());
    this.addDomainErrors(this.email.getDomainErrors());
    this.addDomainErrors(this.birthday.getDomainErrors());
    this.addDomainErrors(this.cellphone.getDomainErrors());
  }
}
