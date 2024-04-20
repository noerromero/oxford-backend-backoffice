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
import { AcademicInstitution } from "../../Shared/Domain/ValueObject/EducationalData/AcademicInstitution";
import { Workplace } from "../../Shared/Domain/ValueObject/Workplace/Workplace";
import { EnglishCertificate } from "../../Shared/Domain/ValueObject/EducationalData/EnglishCertificate";
import { Comment } from "./ValueObject/Comment";

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
  protected academicInstitution: AcademicInstitution;
  protected workplace: Workplace;
  protected englishCertificate: EnglishCertificate;
  protected comment: Comment;
  protected legalRepresentative: LegalRepresentative;

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
    academicInstitution: AcademicInstitution,
    workplace: Workplace,
    englishCertificate: EnglishCertificate,
    comment: Comment,
    address: Address,
    legalRepresentative: LegalRepresentative
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
    this.academicInstitution = academicInstitution;
    this.workplace = workplace;
    this.englishCertificate = englishCertificate;
    this.comment = comment;
    this.address = address;
    this.legalRepresentative = legalRepresentative;
    this.checkIfItIsEmpty();
  }

  //#region Getters
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

  public getAddress(): Address {
    return this.address;
  }

  public getLegalRepresentative(): LegalRepresentative {
    return this.legalRepresentative;
  }

  public getAcademicInstitution(): AcademicInstitution {
    return this.academicInstitution;
  }

  public getWorkplace(): Workplace {
    return this.workplace;
  }

  public getEnglishCertification(): EnglishCertificate {
    return this.englishCertificate;
  }

  public getComment(): Comment {
    return this.comment;
  }
  //#endregion Getters

  //#region Setters
  public setBirthdate(birthdate: Birthdate): void {
    this.birthdate = birthdate;
  }

  public setAddress(address: Address): void {
    this.address = address;
  }

  public setLegalRepresentative(
    legalRepresentative: LegalRepresentative
  ): void {
    this.legalRepresentative = legalRepresentative;
  }
  //#endregion Setters

  //#region Validations
  protected recoverCommonDomainErrors(): void {
    if (this.isEmpty()) return;

    this.address.recoverCommonDomainErrors();
    this.legalRepresentative.recoverCommonDomainErrors();

    this.addDomainErrors(this.id.getDomainErrors());
    this.addDomainErrors(this.dni.getDomainErrors());
    this.addDomainErrors(this.name.getDomainErrors());
    this.addDomainErrors(this.surname.getDomainErrors());
    this.addDomainErrors(this.secondSurname.getDomainErrors());
    this.addDomainErrors(this.email.getDomainErrors());
    this.addDomainErrors(this.phone.getDomainErrors());
    this.addDomainErrors(this.birthdate.getDomainErrors());
    this.addDomainErrors(this.cellphone.getDomainErrors());
    this.addDomainErrors(this.academicInstitution.getDomainErrors());
    this.addDomainErrors(this.workplace.getDomainErrors());
    this.addDomainErrors(this.englishCertificate.getDomainErrors());
    this.addDomainErrors(this.comment.getDomainErrors());
    this.addDomainErrors(this.address.getDomainErrors());
    this.addDomainErrors(this.legalRepresentative.getDomainErrors());

    this.addDomainErrors(this.ensureMinorStudentHasLegalRepresentative());
    this.addDomainErrors(this.ensureStudentIdIsTheSameInAllAggregate());
  }

  protected async recoverDomainErrorsForUpdate(): Promise<void> {
    this.addDomainErrors(await this.ensureIsAnExistingStudent());
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
        this.legalRepresentative.isEmpty()
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

  private ensureStudentIdIsTheSameInAllAggregate(): Array<Error> {
    let domainErros: Array<Error> = [];
    if (this.address.getStudentId().getValue() !== this.id.getValue()) {
      domainErros.push(
        new Error("Student id is not the same in all aggregate")
      );
    }
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

  protected async ensureIsAnExistingStudent(): Promise<Array<Error>> {
    let domainErros: Array<Error> = [];
    const existsByDni = await this.repository.exists(this.dni.getValue());
    if (!existsByDni) {
      this.addDomainError(
        new Error("Student DNI does not exist in the system")
      );
    }
    const existsById = await this.repository.existsById(this.id.toString());
    if (!existsById) {
      this.addDomainError(new Error("Student ID does not exist in the system"));
    }
    return domainErros;
  }
  //#endregion Validations

  //#region Static
  static getDomainTag(): string {
    return "Student";
  }
  //#endregion Static

  //#region Operations
  public async create(): Promise<DomainResponse> {
    this.recoverCommonDomainErrors();
    if (this.hasDomainErrors()) {
      return Promise.resolve(
        new DomainResponse(
          false,
          "Something went wrong with the student data",
          this.toStringArray()
        )
      );
    }

    await this.repository.create(this);
    return new DomainResponse(true, "Student created successfully", []);
  }

  public async update(): Promise<DomainResponse> {
    this.recoverCommonDomainErrors();
    await this.recoverDomainErrorsForUpdate();

    if (this.hasDomainErrors()) {
      return Promise.resolve(
        new DomainResponse(
          false,
          "Something went wrong with the student data",
          this.toStringArray()
        )
      );
    }

    await this.repository.update(this);
    return new DomainResponse(true, "Student updated successfully", []);
  }

  //#endregion Operations
}
