import { AggregateRoot } from "../../Shared/Domain/AggregateRoot";
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
      new Description(StringUtils.isEmpty(description) ? "" : description, Course.tag())
    );
  }

  protected checkIfItIsEmpty(): void {
    this.setEmpty(this.id.isEmpty() && this.name.isEmpty());
  }

  protected recoverCommonDomainErrors(): void {
    this.checkIfItIsEmpty();
  }

  public static tag(): string {
    return "Course";
  }

  public static fromPrimitives(
    plainData: {
      id: string;
      name: string;
      description: string;
    }
  ): Course {
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
}
