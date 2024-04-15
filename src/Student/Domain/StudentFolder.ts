import { AcademicInstitution } from "../../Shared/Domain/ValueObject/EducationalData/AcademicInstitution";
import { EnglishCertificate } from "../../Shared/Domain/ValueObject/EducationalData/EnglishCertificate";
import { Workplace } from "../../Shared/Domain/ValueObject/Workplace/Workplace";
import { Comment } from "./ValueObject/Comment";
import { Uuid } from "../../Shared/Domain/ValueObject/Primitives/Uuid";
import { EntityBase } from "../../Shared/Domain/EntityBase";

export class StudentFolder extends EntityBase<Uuid> {
  protected academicInstitution: AcademicInstitution;
  protected workplace: Workplace;
  protected englishCertificate: EnglishCertificate;
  protected comment: Comment;
  protected studentId: Uuid;

  public constructor(
    id: Uuid,
    academicInstitution: AcademicInstitution,
    workplace: Workplace,
    englishCertificate: EnglishCertificate,
    comment: Comment,
    studentId: Uuid
  ) {
    super(id);
    this.academicInstitution = academicInstitution;
    this.workplace = workplace;
    this.englishCertificate = englishCertificate;
    this.comment = comment;
    this.studentId = studentId;
    this.checkIfItIsEmpty();
  }

  public getId(): Uuid {
    return this.id;
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

  public getStudentId(): Uuid {
    return this.studentId;
  }

  public recoverCommonDomainErrors(): void {
    if (this.isEmpty()) return;

    this.addDomainErrors(this.id.getDomainErrors());
    this.addDomainErrors(this.academicInstitution.getDomainErrors());
    this.addDomainErrors(this.workplace.getDomainErrors());
    this.addDomainErrors(this.englishCertificate.getDomainErrors());
    this.addDomainErrors(this.comment.getDomainErrors());
    this.addDomainErrors(this.studentId.getDomainErrors());
  }

  protected checkIfItIsEmpty(): void {
    this.setEmpty(
      this.id.isEmpty() &&
        this.academicInstitution.isEmpty() &&
        this.workplace.isEmpty() &&
        this.englishCertificate.isEmpty() &&
        this.comment.isEmpty()
    );
  }

  public static getEmptyObject(): StudentFolder {
    return new StudentFolder(
      new Uuid("", StudentFolder.getEntityName()),
      new AcademicInstitution("", StudentFolder.getEntityName()),
      new Workplace("", StudentFolder.getEntityName()),
      new EnglishCertificate("", false, StudentFolder.getEntityName()),
      new Comment("", StudentFolder.getEntityName()),
      new Uuid("", StudentFolder.getEntityName())
    );
  }

  static getEntityName(): string {
    return "Student Folder";
  }
}
