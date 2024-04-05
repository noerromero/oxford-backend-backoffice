import { AcademicInstitution } from "../../Shared/Domain/ValueObject/EducationalData/AcademicInstitution";
import { EnglishCertification } from "../../Shared/Domain/ValueObject/EducationalData/EnglishCertification";
import { Workplace } from "../../Shared/Domain/ValueObject/Workplace/Workplace";
import { Comment } from "./ValueObject/Comment";
import { Uuid } from "../../Shared/Domain/ValueObject/Primitives/Uuid";
import { EntityBase } from "../../Shared/Domain/EntityBase";

export class StudentFile extends EntityBase<Uuid> {
  protected academicInstitution: AcademicInstitution;
  protected workplace: Workplace;
  protected englishCertification: EnglishCertification;
  protected comment: Comment;

  public constructor(
    id: Uuid,
    academicInstitution: AcademicInstitution,
    workplace: Workplace,
    englishCertification: EnglishCertification,
    comment: Comment
  ) {
    super(id);
    this.academicInstitution = academicInstitution;
    this.workplace = workplace;
    this.englishCertification = englishCertification;
    this.comment = comment;
    this.recoveryDomainErrors();
  }

  protected recoveryDomainErrors(): void {
    this.addDomainErrors(this.academicInstitution.getDomainErrors());
    this.addDomainErrors(this.workplace.getDomainErrors());
    this.addDomainErrors(this.englishCertification.getDomainErrors());
    this.addDomainErrors(this.comment.getDomainErrors());
  }
}
