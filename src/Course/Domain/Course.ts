import { AggregateRoot } from "../../Shared/Domain/AggregateRoot";
import { DomainResponse } from "../../Shared/Domain/DomainResponse";
import { Uuid } from "../../Shared/Domain/ValueObject/Primitives/Uuid";
import { StringUtils } from "../../Shared/Infrastructure/Utils/StringUtils";
import { CourseName } from "../Domain/ValueObject/CourseName";
import { Description } from "./ValueObject/Description";

export class Course extends AggregateRoot<Uuid> {
  protected name: CourseName;
  protected description: Description;

  private constructor(id: Uuid, name: CourseName, description: Description) {
    super(id);
    this.name = name;
    this.description = description;
    this.checkIfItIsEmpty();
  }

  public getId(): Uuid {
    return this.id;
  }

  public static create(
    id: string = "",
    name: string = "",
    description: string = ""
  ): Course {
    return new Course(
      new Uuid(
        StringUtils.isEmpty(id) ? Uuid.random().toString() : id,
        Course.tag()
      ),
      new CourseName(StringUtils.isEmpty(name) ? "" : name, Course.tag()),
      new Description(
        StringUtils.isEmpty(description) ? "" : description,
        Course.tag()
      )
    );
  }

  protected checkIfItIsEmpty(): void {
    this.setEmpty(this.id.isEmpty() && this.name.isEmpty());
  }

  public static tag(): string {
    return "Course";
  }

  public static fromPrimitives(plainData: {
    id: string;
    name: string;
    description: string;
  }): Course {
    return new Course(
      new Uuid(plainData.id, Course.tag()),
      new CourseName(plainData.name, Course.tag()),
      new Description(plainData.description, Course.tag())
    );
  }

  public toPrimitives(): any {
    return {
      id: this.id.toString(),
      name: this.name.toString(),
      description: this.description.toString(),
    };
  }

  //#region Validations
  protected recoverCommonDomainErrors(): void {
    if (this.isEmpty()) return;

    this.addDomainErrors(this.id.getDomainErrors());
    this.addDomainErrors(this.name.getDomainErrors());
    this.addDomainErrors(this.description.getDomainErrors());
  }

  protected recoverDomainErrorsForTransactionalOperation(): void {
    this.addDomainErrors(this.ensureHasRepository());
  }

  protected async recoverDomainErrorsForCreate(): Promise<void> {
    this.recoverDomainErrorsForTransactionalOperation();
    this.addDomainErrors(await this.ensureIsNotAnExistingCourseById());
    this.addDomainErrors(await this.ensureIsNotAnExistingCourseByName());
  }

  protected async recoverDomainErrorsForUpdate(): Promise<void> {
    this.recoverDomainErrorsForTransactionalOperation();
    this.addDomainErrors(await this.ensureIsNotAnExistingCourseById());
    this.addDomainErrors(await this.ensureIsNotAnExistingCourseByName());
  }

  protected recoverDomainErrorsForSearchById(): void {
    this.recoverDomainErrorsForTransactionalOperation();
    this.addDomainErrors(this.id.getDomainErrors());
  }

  protected recoverDomainErrorsForDelete(): void {
    this.recoverDomainErrorsForTransactionalOperation();
    this.addDomainErrors(this.id.getDomainErrors());
  }

  protected recoverDomainErrorsForSearchAll(): void {
    this.recoverDomainErrorsForTransactionalOperation();
    this.addDomainErrors(this.id.getDomainErrors());
  }

  protected async ensureIsNotAnExistingCourseById(): Promise<Array<Error>> {
    let domainErrors: Array<Error> = [];
    const exists = await this.repository.existsById(this.id.toString());
    if (exists) {
      this.addDomainError(
        new Error("Course ID is already registered in the system")
      );
    }
    return domainErrors;
  }

  protected async ensureIsNotAnExistingCourseByName(): Promise<Array<Error>> {
    let domainErrors: Array<Error> = [];
    const exists = await this.repository.existsByName(this.name.toString());
    if (exists) {
      this.addDomainError(
        new Error("Course name is already registered in the system")
      );
    }
    return domainErrors;
  }
  //#endregion Validations

  //#region Operations
  public async create(): Promise<DomainResponse> {
    this.recoverCommonDomainErrors();
    await this.recoverDomainErrorsForCreate();

    if (this.hasDomainErrors()) {
      return Promise.resolve(new DomainResponse(false, this.toStringArray()));
    }

    await this.repository.create(this);
    return new DomainResponse(true, []);
  }

  public async searchById(): Promise<DomainResponse> {
    this.recoverDomainErrorsForSearchById();
    if (this.hasDomainErrors()) {
      return Promise.resolve(new DomainResponse(false, this.toStringArray()));
    }
    const student = await this.repository.findById(this.getId().toString());

    if (student === null) {
      return new DomainResponse(false, ["Course not found"]);
    }

    return new DomainResponse(true, student.toPrimitives());
  }

  public async searchAll(): Promise<DomainResponse> {
    this.recoverDomainErrorsForSearchAll();
    if (this.hasDomainErrors()) {
      return Promise.resolve(new DomainResponse(false, this.toStringArray()));
    }
    const professors = await this.repository.findAll();

    if (professors === null) {
      return new DomainResponse(false, ["Courses not found"]);
    }

    const coursesPrimitives = professors.map((course: Course) =>
      course.toPrimitives()
    );

    return new DomainResponse(true, coursesPrimitives);
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

  public async delete(): Promise<DomainResponse> {
    this.recoverDomainErrorsForDelete();
    if (this.hasDomainErrors()) {
      return Promise.resolve(new DomainResponse(false, this.toStringArray()));
    }
    await this.repository.delete(this.getId().toString());

    return new DomainResponse(true, []);
  }
  //#endregion Operations
}
