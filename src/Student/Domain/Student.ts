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

  //#region Constructors
  private constructor(
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
    super(id);
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

  public static create(
    id: string,
    dni: string,
    name: string,
    surname: string,
    secondSurname: string,
    email: string,
    phone: string,
    birthdate: string,
    cellphone: string,
    academicInstitution: string,
    workplace: string,
    isOtherEnglishCertificate: boolean,
    englishCertificate: string,
    comment: string,
    address: Address,
    legalRepresentative: LegalRepresentative
  ): Student {
    return new Student(
      new Uuid(id, Student.tag()),
      new Dni(dni, Student.tag()),
      new FirstName(name, Student.tag()),
      new Surname(surname, Student.tag()),
      new Surname(secondSurname, Student.tag(), true),
      new Email(email, Student.tag(), true),
      new Phone(phone, Student.tag(), true),
      new Birthdate(birthdate, Student.tag()),
      new Cellphone(cellphone, Student.tag(), true),
      new AcademicInstitution(academicInstitution, Student.tag(), true),
      new Workplace(workplace, Student.tag(), true),
      new EnglishCertificate(
        englishCertificate,
        isOtherEnglishCertificate,
        Student.tag(),
        true
      ),
      new Comment(comment, Student.tag(), true),
      address,
      legalRepresentative
    );
  }

  public static createForSearchById(
    id: string
  ): Student {
    return new Student(
      new Uuid(id, Student.tag()),
      new Dni("", Student.tag(), true),
      new FirstName("", Student.tag(), true),
      new Surname("", Student.tag(), true),
      new Surname("", Student.tag(), true),
      new Email("", Student.tag(), true),
      new Phone("", Student.tag(), true),
      new Birthdate("", Student.tag()),
      new Cellphone("", Student.tag(), true),
      new AcademicInstitution("", Student.tag(), true),
      new Workplace("", Student.tag(), true),
      new EnglishCertificate("", false, Student.tag(), true),
      new Comment("", Student.tag(), true),
      Address.getEmptyObject(),
      LegalRepresentative.getEmptyObject()
    );
  }

  public static fromPrimitives(
    plainData: {
      id: string;
      dni: string;
      name: string;
      surname: string;
      secondSurname: string;
      email: string;
      phone: string;
      birthdate: string;
      cellphone: string;
      academicInstitution: string;
      workplace: string;
      isOtherEnglishCertificate: boolean;
      englishCertificate: string;
      comment: string;
    }
  ): Student {
    return new Student(
      new Uuid(plainData.id, Student.tag()),
      new Dni(plainData.dni, Student.tag()),
      new FirstName(plainData.name, Student.tag()),
      new Surname(plainData.surname, Student.tag()),
      new Surname(plainData.secondSurname, Student.tag(), true),
      new Email(plainData.email, Student.tag(), true),
      new Phone(plainData.phone, Student.tag(), true),
      new Birthdate(plainData.birthdate, Student.tag()),
      new Cellphone(plainData.cellphone, Student.tag(), true),
      new AcademicInstitution(
        plainData.academicInstitution,
        Student.tag(),
        true
      ),
      new Workplace(plainData.workplace, Student.tag(), true),
      new EnglishCertificate(
        plainData.englishCertificate,
        plainData.isOtherEnglishCertificate,
        Student.tag(),
        true
      ),
      new Comment(plainData.comment, Student.tag(), true),
      Address.getEmptyObject(),
      LegalRepresentative.getEmptyObject()
    );
  }
  //#endregion Constructors

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

  public toPrimitives(): any {
    const address = this.getAddress().toPrimitives();
    const legalRepresentative = this.getLegalRepresentative().toPrimitives();
    return {
      id: this.id.toString(),
      dni: this.dni.toString(),
      name: this.name.toString(),
      surname: this.surname.toString(),
      secondSurname: this.secondSurname.toString(),
      email: this.email.toString(),
      phone: this.phone.toString(),
      birthdate: this.birthdate.getValue(),
      cellphone: this.cellphone.toString(),
      academicInstitution: this.academicInstitution.toString(),
      workplace: this.workplace.toString(),
      englishCertificate: this.englishCertificate.toString(),
      comment: this.comment.toString(),
      legalRepresentative: legalRepresentative,
      address: address,
    };
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
  }

  protected async recoverDomainErrorsForUpdate(): Promise<void> {
    this.recoverDomainErrorsForTransactionalOperation();
    this.addDomainErrors(await this.ensureIsAnExistingStudentByDniAndId());
  }

  protected async recoverDomainErrorsForCreate(): Promise<void> {
    this.recoverDomainErrorsForTransactionalOperation();
    this.addDomainErrors(await this.ensureIsNotAnExistingStudentByDniAndId());
  }

  protected recoverDomiainErrorsForSearchById(): void {
    this.recoverDomainErrorsForTransactionalOperation();
    this.addDomainErrors(this.id.getDomainErrors());
  }

  protected recoverDomainErrorsForTransactionalOperation(): void {
    this.addDomainErrors(this.ensureHasReporitory());
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

  protected async ensureIsAnExistingStudentByDniAndId(): Promise<Array<Error>> {
    let domainErros: Array<Error> = [];
    const existsByDni = await this.repository.existsByDni(this.dni.toString());
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

  protected async ensureIsNotAnExistingStudentByDniAndId(): Promise<
    Array<Error>
  > {
    let domainErros: Array<Error> = [];
    const existsByDni = await this.repository.existsByDni(this.dni.toString());
    if (existsByDni) {
      this.addDomainError(
        new Error("Student DNI is already registered in the system")
      );
    }
    const existsById = await this.repository.existsById(this.id.toString());
    if (existsById) {
      this.addDomainError(
        new Error("Student ID is already registered in the system")
      );
    }
    return domainErros;
  }

  protected ensureHasReporitory(): Array<Error> {
    let domainErros: Array<Error> = [];
    if (this.repository === null) {
      this.addDomainError(new Error("Repository is required"));
    }
    return domainErros;
  }
  //#endregion Validations

  //#region Static
  static tag(): string {
    return "Student";
  }
  //#endregion Static

  //#region Operations
  public async create(): Promise<DomainResponse> {
    this.recoverCommonDomainErrors();
    await this.recoverDomainErrorsForCreate();

    if (this.hasDomainErrors()) {
      return Promise.resolve(
        new DomainResponse(
          false,
          this.toStringArray()
        )
      );
    }

    await this.repository.create(this);
    return new DomainResponse(
      true,
      []
    );
  }

  public async update(): Promise<DomainResponse> {
    this.recoverCommonDomainErrors();
    await this.recoverDomainErrorsForUpdate();

    if (this.hasDomainErrors()) {
      return Promise.resolve(new DomainResponse(false, this.toStringArray()));
    }

    await this.repository.update(this);
    return new DomainResponse(true, []);
  }

  public async searchById(): Promise<DomainResponse> {
    this.recoverDomiainErrorsForSearchById();
    if (this.hasDomainErrors()) {
      return Promise.resolve(new DomainResponse(false, this.toStringArray()));
    }
    const student = await this.repository.findById(this.getId().toString());

    if (student === null) {
      return new DomainResponse(false, ["Student not found"]);
    }

    return new DomainResponse(true, student.toPrimitives());
  }

  //#endregion Operations
}
