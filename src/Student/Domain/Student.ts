import { PersonId } from "../../Shared/Domain/ValueObject/PersonalData/PersonId";
import { FirstName } from "../../Shared/Domain/ValueObject/PersonalData/FirstName";
import { Surname } from "../../Shared/Domain/ValueObject/PersonalData/Surname";
import { Email } from "../../Shared/Domain/ValueObject/PersonalData/Email";
import { Phone } from "../../Shared/Domain/ValueObject/PersonalData/Phone";
import { Birthdate } from "../../Shared/Domain/ValueObject/PersonalData/Birthdate";
import { Cellphone } from "../../Shared/Domain/ValueObject/PersonalData/Cellphone";
import { Address } from "./Address";
import { Uuid } from "../../Shared/Domain/ValueObject/Primitives/Uuid";
import { AggregateRoot } from "../../Shared/Domain/AggregateRoot";
import { IStudentRepository } from "./IStudentRepository";
import { DomainResponse } from "../../Shared/Domain/DomainResponse";
import { LegalRepresentative } from "./LegalRepresentative";
import { StudentFile } from "./StudentFile";

export class Student extends AggregateRoot<Uuid> {
  protected dni: PersonId;
  protected name: FirstName;
  protected surname: Surname;
  protected secondSurname: Surname;
  protected email: Email;
  protected phone: Phone;
  protected birthdate: Birthdate;
  protected cellphone: Cellphone;
  protected address: Address;
  protected legalRepresentative: LegalRepresentative;
  protected studentFile: StudentFile;

  constructor(
    repository: IStudentRepository,
    id: Uuid,
    dni: PersonId,
    name: FirstName,
    surname: Surname,
    secondSurname: Surname,
    email: Email,
    phone: Phone,
    birthdate: Birthdate,
    cellphone: Cellphone,
    address: Address,
    legalRepresentative: LegalRepresentative,
    studentFile: StudentFile
  ) {
    super(repository, id);
    this.dni = dni;
    this.name = name;
    this.surname = surname;
    this.secondSurname = secondSurname;
    this.email = email;
    this.phone = phone;
    this.birthdate = birthdate;
    this.cellphone = cellphone;
    this.address = address;
    this.legalRepresentative = legalRepresentative;
    this.studentFile = studentFile;
    this.recoveryDomainErrors();
  }

  protected recoveryDomainErrors(): void {
    this.addDomainErrors(this.dni.getDomainErrors());
    this.addDomainErrors(this.name.getDomainErrors());
    this.addDomainErrors(this.surname.getDomainErrors());
    this.addDomainErrors(this.secondSurname.getDomainErrors());
    this.addDomainErrors(this.email.getDomainErrors());
    this.addDomainErrors(this.phone.getDomainErrors());
    this.addDomainErrors(this.birthdate.getDomainErrors());
    this.addDomainErrors(this.cellphone.getDomainErrors());
    this.addDomainErrors(this.address.getDomainErrors());
    this.addDomainErrors(this.legalRepresentative.getDomainErrors());
    this.addDomainErrors(this.studentFile.getDomainErrors());
  }

  protected async handleSave(): Promise<DomainResponse> {
    await this.repository.save(this);
    return new DomainResponse(true, []);
  }
}
