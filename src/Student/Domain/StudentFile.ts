import { AcademicInstitution } from "../../Shared/Domain/ValueObject/EducationalData/AcademicInstitution";
import { EnglishCertificate } from "../../Shared/Domain/ValueObject/EducationalData/EnglishCertificate";
import { Workplace } from "../../Shared/Domain/ValueObject/Workplace/Workplace";
import { Comment } from "./ValueObject/Comment";
import { Uuid } from "../../Shared/Domain/ValueObject/Primitives/Uuid";
import { EntityBase } from "../../Shared/Domain/EntityBase";

export class StudentFile extends EntityBase<Uuid> {
  protected academicInstitution: AcademicInstitution;
  protected workplace: Workplace;
  protected englishCertification: EnglishCertificate;
  protected comment: Comment;

  public constructor(
    id: Uuid,
    academicInstitution: AcademicInstitution,
    workplace: Workplace,
    englishCertification: EnglishCertificate,
    comment: Comment
  ) {
    super(id);
    this.academicInstitution = academicInstitution;
    this.workplace = workplace;
    this.englishCertification = englishCertification;
    this.comment = comment;
    this.checkIfItIsEmpty();
  }

  public recoveryDomainErrors(): void {
    if (this.isEmpty()) return;

    this.addDomainErrors(this.id.getDomainErrors());
    this.addDomainErrors(this.academicInstitution.getDomainErrors());
    this.addDomainErrors(this.workplace.getDomainErrors());
    this.addDomainErrors(this.englishCertification.getDomainErrors());
    this.addDomainErrors(this.comment.getDomainErrors());
  }

  protected checkIfItIsEmpty(): void {
    this.setEmpty(
      this.id.isEmpty() &&
        this.academicInstitution.isEmpty() &&
        this.workplace.isEmpty() &&
        this.englishCertification.isEmpty() &&
        this.comment.isEmpty()
    );
  }

  public static getEmptyObject(): StudentFile {
    return new StudentFile(
      new Uuid("", StudentFile.getEntityName()),
      new AcademicInstitution("", StudentFile.getEntityName()),
      new Workplace("", StudentFile.getEntityName()),
      new EnglishCertificate("", false, StudentFile.getEntityName()),
      new Comment("", StudentFile.getEntityName())
    );
  }

  static getEntityName(): string {
    return "Student File";
  }
}
