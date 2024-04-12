import { Dni } from "../../Shared/Domain/ValueObject/PersonalData/Dni";
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
  protected dni: Dni;
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
    dni: Dni,
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
    this.checkIfItIsEmpty();
  }

  public getId(): Uuid {
    return this.id;
  }

  public getDni(): Dni {
    return this.dni;
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

  public getEmail(): Email {
    return this.email;
  }

  public getPhone(): Phone {
    return this.phone;
  }

  public getBirthdate(): Birthdate {
    return this.birthdate;
  }

  public getCellphone(): Cellphone {
    return this.cellphone;
  }

  protected recoveryDomainErrors(): void {
    if (this.isEmpty()) return;

    this.address.recoveryDomainErrors();
    this.legalRepresentative.recoveryDomainErrors();
    this.studentFile.recoveryDomainErrors();

    this.addDomainErrors(this.id.getDomainErrors());
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

    this.addDomainErrors(this.ensureMinorStudentHasLegalRepresentative());
    this.addDomainErrors(this.ensureStudentIsNotDuplicate());
  }

  protected async handleSave(): Promise<DomainResponse> {
    await this.repository.save(this);
    return new DomainResponse(true, []);
  }

  protected checkIfItIsEmpty(): void {
    this.setEmpty(
      this.id.isEmpty() &&
        this.dni.isEmpty() &&
        this.name.isEmpty() &&
        this.surname.isEmpty() &&
        this.secondSurname.isEmpty() &&
        this.email.isEmpty() &&
        this.phone.isEmpty() &&
        this.birthdate.isEmpty() &&
        this.cellphone.isEmpty() &&
        this.address.isEmpty() &&
        this.legalRepresentative.isEmpty() &&
        this.studentFile.isEmpty()
    );
  }

  private ensureMinorStudentHasLegalRepresentative(): Array<Error> {
    let domainErros: Array<Error> = [];
    if (!this.isAdult()) {
      if (this.legalRepresentative.isEmpty()) {
        domainErros.push(
          new Error("Legal representative is required for minor students")
        );
      }
    }
    return domainErros;
  }

  private ensureStudentIsNotDuplicate(): Array<Error> {
    let domainErros: Array<Error> = [];
    //TODO: Check if student is duplicate
    return domainErros;
  }

  public isAdult(): boolean {
    const now = new Date();
    const age = now.getFullYear() - this.birthdate.getYear();
    const month = now.getMonth() - this.birthdate.getMonth();
    if (
      month < 0 ||
      (month === 0 && now.getDate() < this.birthdate.getValue().getDate())
    ) {
      return age - 1 >= Birthdate.ADULT_AGE;
    }
    return age >= Birthdate.ADULT_AGE;
  }

  public setBirthdate(birthdate: Birthdate): void {
    this.birthdate = birthdate;
  }

  static getEntityName(): string {
    return "Student";
  }
}
