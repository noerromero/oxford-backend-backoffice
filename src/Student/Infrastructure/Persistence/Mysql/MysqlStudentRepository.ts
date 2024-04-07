import { connect } from "../../../../Shared/Infrastructure/Persistence/Mysql/Connection";
import { IStudentRepository } from "../../../Domain/IStudentRepository";
import { Student } from "../../../Domain/Student";
import IStudentDb from "./dbEntity/IStudentDb";

export class MysqlStudentRepository implements IStudentRepository {
  public async save(student: Student): Promise<void> {
    const studentDbEntity: IStudentDb = {
      id: student.getId().toString(),
      dni: student.getDni().toString(),
      name: student.getName().toString(),
      surname: student.getSurname().toString(),
      second_surname: student.getSurname().toString(),
      email: student.getEmail().toString(),
      phone: student.getPhone().toString(),
      bhirtdate: student.getBirthdate().getValue(),
      cellphone: student.getCellphone().toString(),
    };

    const conn = await connect();
    await conn.query("INSERT INTO `backoffice.student` SET ?", [
      studentDbEntity,
    ]);
  }
}
