import { AggregateRoot } from "../../Shared/Domain/AggregateRoot";
import { Uuid } from "../../Shared/Domain/ValueObject/Primitives/Uuid";
import { StringUtils } from "../../Shared/Infrastructure/Utils/StringUtils";
import { CourseName } from "../Domain/ValueObject/CourseName";

export class Course extends AggregateRoot<Uuid> {
  protected id: Uuid;
  protected name: CourseName;

  private constructor(
    id: Uuid,
    name: CourseName
  ) {
    super(id);
    this.id = id;
    this.name = name;
  }

  public getId(): Uuid {
    return this.id;
  }

  public static create(
    id: string = "",
    name: string = ""
  ): Course {
    return new Course(
      new Uuid(StringUtils.isEmpty(id) ? Uuid.random().toString() : id, Course.tag()),
      new CourseName(StringUtils.isEmpty(name) ? "" : name, Course.tag())
    );
  }

  protected checkIfItIsEmpty(): void {
    this.setEmpty(
      this.id.isEmpty() &&
        this.name.isEmpty()
    );
  }

  protected recoverCommonDomainErrors(): void {
    this.checkIfItIsEmpty();
  }

  public static tag(): string {        
    return "Course";
  }
}