import { connect } from "../../../../Shared/Infrastructure/Persistence/Mysql/Connection";
import { IStudentRepository } from "../../../Domain/IStudentRepository";
import { Student } from "../../../Domain/Student";
import { IAddressDb } from "./dbEntity/IAddressDb";
import { ILegalRepresentativeDb } from "./dbEntity/ILegalRepresentativeDb";
import IStudentDb from "./dbEntity/IStudentDb";
import { IStudentFolderDb } from "./dbEntity/IStudentFolderDb";

export class MysqlStudentRepository implements IStudentRepository {
  public async create(student: Student): Promise<void> {
    const studentDbEntity: IStudentDb = {
      id: student.getId().toString(),
      dni: student.getDni().toString(),
      name: student.getName().toString(),
      surname: student.getSurname().toString(),
      second_surname: student.getSecondSurname().toString(),
      email: student.getEmail().toString(),
      phone: student.getPhone().toString(),
      bhirtdate: student.getBirthdate().getValue(),
      cellphone: student.getCellphone().toString(),
    };

    const addressDbEntity: IAddressDb = {
      id: student.getAddress().getId().toString(),
      street: student.getAddress().getStreet().toString(),
      neighborhood: student.getAddress().getNeighborhood().toString(),
      city: student.getAddress().getCity().toString(),
      state: student.getAddress().getState().toString(),
      reference: student.getAddress().getReference().toString(),
      student_id: student.getAddress().getStudentId().toString(),
    };

    const legalRepresentativeDbEntity: ILegalRepresentativeDb = {
      id: student.getLegalRepresentative().getId().toString(),
      name: student.getLegalRepresentative().getName().toString(),
      surname: student.getLegalRepresentative().getSurname().toString(),
      second_surname: student
        .getLegalRepresentative()
        .getSecondSurname()
        .toString(),
      phone: student.getLegalRepresentative().getPhone().toString(),
      cellphone: student.getLegalRepresentative().getCellphone().toString(),
      student_id: student.getLegalRepresentative().getStudentId().toString(),
    };

    const studentFolderDbEntity: IStudentFolderDb = {
      id: student.getStudentFolder().getId().toString(),
      academic_institution: student
        .getStudentFolder()
        .getAcademicInstitution()
        .toString(),
      workplace: student.getStudentFolder().getWorkplace().toString(),
      english_certificate: student
        .getStudentFolder()
        .getEnglishCertification()
        .toString(),
      comment: student.getStudentFolder().getComment().toString(),
      student_id: student.getStudentFolder().getStudentId().toString(),
    };

    const conn = await connect();
    await conn.query("INSERT INTO `backoffice.student` SET ?", [
      studentDbEntity,
    ]);

    await conn.query("INSERT INTO `backoffice.address` SET ?", [
      addressDbEntity,
    ]);

    await conn.query("INSERT INTO `backoffice.legal_representative` SET ?", [
      legalRepresentativeDbEntity,
    ]);

    await conn.query("INSERT INTO `backoffice.student_folder` SET ?", [
      studentFolderDbEntity,
    ]);
  }
}
