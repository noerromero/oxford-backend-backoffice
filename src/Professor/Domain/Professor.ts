import { Uuid } from '../../Shared/Domain/ValueObject/Primitives/Uuid';
import { FirstName } from '../../Shared/Domain/ValueObject/PersonalData/FirstName';
import { Surname } from '../../Shared/Domain/ValueObject/PersonalData/Surname';
import { Email } from '../../Shared/Domain/ValueObject/PersonalData/Email';
import { Cellphone } from '../../Shared/Domain/ValueObject/PersonalData/Cellphone';
import { Birthday } from '../../Shared/Domain/ValueObject/PersonalData/Birthday';
import { AggregateRoot } from '../../Shared/Domain/AggregateRoot';
import { Dni } from '../../Shared/Domain/ValueObject/PersonalData/Dni';
import { DomainResponse } from '../../Shared/Domain/DomainResponse';
import { StringUtils } from '../../Shared/Infrastructure/Utils/StringUtils';

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

  public static create(
    id: string = "",
    dni: string = "",
    name: string = "",
    surname: string = "",
    secondSurname: string = "",
    email: string = "",
    birthday: string = "",
    cellphone: string = "",
  ): Professor {
    return new Professor(
      new Uuid(StringUtils.isEmpty(id) ? Uuid.random().toString() : id, Professor.tag()),
      new Dni(StringUtils.isEmpty(dni) ? "" : dni , Professor.tag()),
      new FirstName(StringUtils.isEmpty(name) ? "" : name, Professor.tag()),
      new Surname(StringUtils.isEmpty(surname) ? "" : surname, Professor.tag()),
      new Surname(StringUtils.isEmpty(secondSurname) ? "" : secondSurname, Professor.tag(), true),
      new Email(StringUtils.isEmpty(email) ? "" : email, Professor.tag(), true),
      new Cellphone(StringUtils.isEmpty(cellphone) ? "" : cellphone, Professor.tag(), true),
      new Birthday(StringUtils.isEmpty(birthday) ? "" : birthday, Professor.tag()),
    );
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

  protected recoverDomainErrorsForTransactionalOperation(): void {
    this.addDomainErrors(this.ensureHasRepository());
  }

  protected async recoverDomainErrorsForCreate(): Promise<void> {
    this.recoverDomainErrorsForTransactionalOperation();
    this.addDomainErrors(await this.ensureIsNotAnExistingProfessorByDniAndId());
  }

  protected async ensureIsNotAnExistingProfessorByDniAndId(): Promise<
    Array<Error>
  > {
    let domainErrors: Array<Error> = [];
    const existsByDni = await this.repository.existsByDni(this.dni.toString());
    if (existsByDni) {
      this.addDomainError(
        new Error("Professor DNI is already registered in the system")
      );
    }
    const existsById = await this.repository.existsById(this.id.toString());
    if (existsById) {
      this.addDomainError(
        new Error("Professor ID is already registered in the system")
      );
    }
    return domainErrors;
  }

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

  public async searchAll(): Promise<DomainResponse> {
    this.recoverDomainErrorsForSearchAll();
    if (this.hasDomainErrors()) {
      return Promise.resolve(new DomainResponse(false, this.toStringArray()));
    }
    const professors = await this.repository.findAll();

    if (professors === null) {
      return new DomainResponse(false, ["Professors not found"]);
    }

    const professorsPrimitives = professors.map((professor: Professor) => professor.toPrimitives());

    return new DomainResponse(true, professorsPrimitives);
  }

  protected recoverDomainErrorsForSearchAll(): void {
    this.recoverDomainErrorsForTransactionalOperation();
    this.addDomainErrors(this.id.getDomainErrors());
  }

  public static fromPrimitives(
    plainData: {
      id: string;
      dni: string;
      name: string;
      surname: string;
      secondSurname: string;
      email: string;
      cellphone: string;
      birthday: string;
    }
  ): Professor {
    return new Professor(
      new Uuid(plainData.id, Professor.tag()),
      new Dni(plainData.dni, Professor.tag()),
      new FirstName(plainData.name, Professor.tag()),
      new Surname(plainData.surname, Professor.tag()),
      new Surname(plainData.secondSurname, Professor.tag(), true),
      new Email(plainData.email, Professor.tag(), true),
      new Cellphone(plainData.cellphone, Professor.tag(), true),
      new Birthday(plainData.birthday, Professor.tag()),
    );
  }

  static tag(): string {
    return "Professor";
  }

  public getCompleteName(): string {
    return `${this.surname.toString()} ${this.secondSurname.toString()}, ${this.name.toString()}`.trim();
  }

  public toPrimitives(): any {
    return {
      id: this.id.toString(),
      dni: this.dni.toString(),
      name: this.name.toString(),
      surname: this.surname.toString(),
      secondSurname: this.secondSurname.toString(),
      completeName: this.getCompleteName(),
      email: this.email.toString(),
      birthday: this.birthday.toShortString(),
      cellphone: this.cellphone.toString(),
    };
  }
}
