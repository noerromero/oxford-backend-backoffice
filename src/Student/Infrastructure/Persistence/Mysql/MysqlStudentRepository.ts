import { Pool } from "mysql2/promise";
import { connect } from "../../../../Shared/Infrastructure/Persistence/Mysql/Connection";
import { Address } from "../../../Domain/Address";
import { IStudentRepository } from "../../../Domain/IStudentRepository";
import { LegalRepresentative } from "../../../Domain/LegalRepresentative";
import { Student } from "../../../Domain/Student";
import { IAddressDb } from "./dbEntity/IAddressDb";
import IStudentDb from "./dbEntity/IStudentDb";

export class MysqlStudentRepository implements IStudentRepository {
  public async findById(id: string): Promise<Student | null> {
    const conn = await connect();
    const studentRows = await conn.query(
      "SELECT * FROM `backoffice.student` WHERE id = ?",
      [id]
    );
    const studentDbEntity = JSON.parse(JSON.stringify(studentRows[0]));

    if (!studentDbEntity) {
      return null;
    }

    let student = this.getStudentFromPrimitives(studentDbEntity[0]);

    const addressRows = await conn.query(
      "SELECT * FROM `backoffice.address` WHERE student_id = ?",
      [id]
    );
    const addressDbEntity = JSON.parse(JSON.stringify(addressRows[0]));
    const address = this.getAddressFromPrimitives(addressDbEntity[0]);

    student.setAddress(address);

    return student;
  }

  public async existsByDni(dni: string): Promise<boolean> {
    const conn = await connect();
    const studentRows = await conn.query(
      "SELECT 1 FROM `backoffice.student` WHERE dni = ?",
      [dni]
    );

    const studentDbEntity = JSON.parse(JSON.stringify(studentRows[0]));
    if (Object.keys(studentDbEntity).length === 0) {
      return false;
    }
    return true;
  }

  public async existsById(id: string): Promise<boolean> {
    const conn = await connect();
    const studentRows = await conn.query(
      "SELECT 1 FROM `backoffice.student` WHERE id = ?",
      [id]
    );
    const studentDbEntity = JSON.parse(JSON.stringify(studentRows[0]));

    if (Object.keys(studentDbEntity).length === 0) {
      return false;
    }
    return true;
  }

  public async update(student: Student): Promise<void> {
    const studentDbEntity = this.getStudentDbEntityFromDomain(student);

    const addressDbEntity = this.getAddressDbEntityFromDomain(student);

    const conn = await connect();
    await this.updateStudent(studentDbEntity, conn);
    await this.deleteAddress(student.getId().toString(), conn);
    await this.insertAddress(addressDbEntity, conn);
  }

  public async create(student: Student): Promise<void> {
    const studentDbEntity = this.getStudentDbEntityFromDomain(student);

    const addressDbEntity = this.getAddressDbEntityFromDomain(student);

    const conn = await connect();
    await this.insertStudent(studentDbEntity, conn);
    await this.insertAddress(addressDbEntity, conn);
  }

  private async deleteAddress(studentId: string, conn: Pool): Promise<void> {
    await conn.query("DELETE FROM `backoffice.address` WHERE student_id = ?", [
      studentId,
    ]);
  }

  private async updateStudent(
    studentDbEntity: IStudentDb,
    conn: Pool
  ): Promise<void> {
    await conn.query("UPDATE `backoffice.student` SET ? WHERE ID = ?", [
      studentDbEntity,
      studentDbEntity.id,
    ]);
  }

  private async insertStudent(
    studentDbEntity: IStudentDb,
    conn: Pool
  ): Promise<void> {
    await conn.query("INSERT INTO `backoffice.student` SET ?", [
      studentDbEntity,
    ]);
  }

  private async insertAddress(
    addressDbEntity: IAddressDb,
    conn: Pool
  ): Promise<void> {
    await conn.query("INSERT INTO `backoffice.address` SET ?", [
      addressDbEntity,
    ]);
  }

  private getStudentFromPrimitives(studentRow: any): Student {
    const legalRepresentative = LegalRepresentative.fromPrimitives({
      name: studentRow.legal_representative_name,
      surname: studentRow.legal_representative_surname,
      secondSurname: studentRow.legal_representative_second_surname,
      phone: studentRow.legal_representative_phone,
      cellphone: studentRow.legal_representative_cellphone,
    });

    let student = Student.fromPrimitives(this, {
      id: studentRow.id,
      dni: studentRow.dni,
      name: studentRow.name,
      surname: studentRow.surname,
      secondSurname: studentRow.second_surname,
      email: studentRow.email,
      phone: studentRow.phone,
      birthdate: studentRow.birthdate,
      cellphone: studentRow.cellphone,
      academicInstitution: studentRow.academic_institution,
      workplace: studentRow.workplace,
      isOtherEnglishCertificate: true,
      englishCertificate: studentRow.english_certificate,
      comment: studentRow.comment,
    });

    student.setLegalRepresentative(legalRepresentative);

    return student;
  }

  private getAddressFromPrimitives(addressRow: any): Address {
    return Address.fromPrimitives({
      id: addressRow.id,
      street: addressRow.street,
      neighborhood: addressRow.neighborhood,
      city: addressRow.city,
      state: addressRow.state,
      reference: addressRow.reference,
    });
  }

  private getStudentDbEntityFromDomain(student: Student): IStudentDb {
    const plainStudent = student.toPrimitives();

    const studentDbEntity: IStudentDb = {
      id: plainStudent.id ?? null,
      dni: plainStudent.dni ?? null,
      name: plainStudent.name ?? null,
      surname: plainStudent.surname ?? null,
      second_surname: plainStudent.secondSurname ?? null,
      email: plainStudent.email ?? null,
      phone: plainStudent.phone ?? null,
      bhirtdate: plainStudent.birthdate ?? null,
      cellphone: plainStudent.cellphone ?? null,
      academic_institution: plainStudent.academicInstitution ?? null,
      workplace: plainStudent.workplace ?? null,
      english_certificate: plainStudent.englishCertificate ?? null,
      comment: plainStudent.comment ?? null,
      legal_representative_name: plainStudent.legalRepresentative.name ?? null,
      legal_representative_surname:
        plainStudent.legalRepresentative.surname ?? null,
      legal_representative_second_surname:
        plainStudent.legalRepresentative.secondSurname ?? null,
      legal_representative_phone:
        plainStudent.legalRepresentative.phone ?? null,
      legal_representative_cellphone:
        plainStudent.legalRepresentative.cellphone ?? null,
    };
    return studentDbEntity;
  }

  private getAddressDbEntityFromDomain(student: Student): IAddressDb {
    let addressDbEntity: IAddressDb = student.toPrimitives().address;
    addressDbEntity.student_id = student.getId().toString();
    return addressDbEntity;
  }
}
