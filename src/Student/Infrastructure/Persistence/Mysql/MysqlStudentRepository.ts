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
      comment: studentRow.comment
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
    const studentDbEntity: IStudentDb = {
      id: student.getId().toString(),
      dni: student.getDni().toString() ?? null,
      name: student.getName().toString() ?? null,
      surname: student.getSurname().toString() ?? null,
      second_surname: student.getSecondSurname().toString() ?? null,
      email: student.getEmail().toString() ?? null,
      phone: student.getPhone().toString() ?? null,
      bhirtdate: student.getBirthdate().getValue() ?? null,
      cellphone: student.getCellphone().toString() ?? null,
      academic_institution: student.getAcademicInstitution().toString() ?? null,
      workplace: student.getWorkplace().toString() ?? null,
      english_certificate: student.getEnglishCertification().toString() ?? null,
      comment: student.getComment().toString() ?? null,
      legal_representative_name:
        student.getLegalRepresentative().getName().toString() ?? null,
      legal_representative_surname:
        student.getLegalRepresentative().getSurname().toString() ?? null,
      legal_representative_second_surname:
        student.getLegalRepresentative().getSecondSurname().toString() ?? null,
      legal_representative_phone:
        student.getLegalRepresentative().getPhone().toString() ?? null,
      legal_representative_cellphone:
        student.getLegalRepresentative().getCellphone().toString() ?? null,
    };
    return studentDbEntity;
  }

  private getAddressDbEntityFromDomain(student: Student): IAddressDb {
    const addressDbEntity: IAddressDb = {
      id: student.getAddress().getId().toString(),
      street: student.getAddress().getStreet().toString() ?? null,
      neighborhood: student.getAddress().getNeighborhood().toString() ?? null,
      city: student.getAddress().getCity().toString() ?? null,
      state: student.getAddress().getState().toString() ?? null,
      reference: student.getAddress().getReference().toString() ?? null,
      student_id: student.getId().toString(),
    };
    return addressDbEntity;
  }
}
