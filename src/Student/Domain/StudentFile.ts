import { AggregateRoot } from "../../Shared/Domain/AggregateRoot";
import { DomainResponse } from "../../Shared/Domain/DomainResponse";
import { AcademicInstitution } from "../../Shared/Domain/ValueObject/EducationalData/AcademicInstitution";
import { EnglishCertification } from "../../Shared/Domain/ValueObject/EducationalData/EnglishCertification";
import { Workplace } from "../../Shared/Domain/ValueObject/Workplace/Workplace";
import { IStudentFileRepository } from "./IStudentFileRepository";
import { LegalRepresentative } from "./LegalRepresentative";
import { Student } from "./Student";
import { Comment } from "./ValueObject/Comment";
import  { Uuid } from "../../Shared/Domain/ValueObject/Primitives/Uuid";

export class StudentFile extends AggregateRoot<Uuid> {
  protected student: Student;
  protected legalRepresentative: LegalRepresentative;
  protected academicInstitution: AcademicInstitution;
  protected workplace: Workplace;
  protected englishCertification: EnglishCertification;
  protected comment: Comment;

  public constructor(
    repository: IStudentFileRepository,
    studentFileId: Uuid,
    student: Student,
    legalRepresentative: LegalRepresentative,
    academicInstitution: AcademicInstitution,
    workplace: Workplace,
    englishCertification: EnglishCertification,
    comment: Comment
  ) {
    super(repository, studentFileId);
    this.student = student;
    this.legalRepresentative = legalRepresentative;
    this.academicInstitution = academicInstitution;
    this.workplace = workplace;
    this.englishCertification = englishCertification;
    this.comment = comment;
    this.recoveryDomainErrors();
  }

  protected recoveryDomainErrors(): void {
    this.addDomainErrors(this.student.getDomainErrors());
    this.addDomainErrors(this.legalRepresentative.getDomainErrors());
    this.addDomainErrors(this.academicInstitution.getDomainErrors());
    this.addDomainErrors(this.workplace.getDomainErrors());
    this.addDomainErrors(this.englishCertification.getDomainErrors());
    this.addDomainErrors(this.comment.getDomainErrors());
  }

  protected async handleSave(): Promise<DomainResponse> {
    await this.repository.save(this);
    return new DomainResponse(true, []);
  }
}
