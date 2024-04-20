import { Pool } from "mysql2/promise";
import { City } from "../../../../Shared/Domain/ValueObject/Address/City";
import { Neighborhood } from "../../../../Shared/Domain/ValueObject/Address/Neighborhood";
import { Reference } from "../../../../Shared/Domain/ValueObject/Address/Reference";
import { State } from "../../../../Shared/Domain/ValueObject/Address/State";
import { Street } from "../../../../Shared/Domain/ValueObject/Address/Street";
import { AcademicInstitution } from "../../../../Shared/Domain/ValueObject/EducationalData/AcademicInstitution";
import { EnglishCertificate } from "../../../../Shared/Domain/ValueObject/EducationalData/EnglishCertificate";
import { Birthdate } from "../../../../Shared/Domain/ValueObject/PersonalData/Birthdate";
import { Cellphone } from "../../../../Shared/Domain/ValueObject/PersonalData/Cellphone";
import { Dni } from "../../../../Shared/Domain/ValueObject/PersonalData/Dni";
import { Email } from "../../../../Shared/Domain/ValueObject/PersonalData/Email";
import { FirstName } from "../../../../Shared/Domain/ValueObject/PersonalData/FirstName";
import { Phone } from "../../../../Shared/Domain/ValueObject/PersonalData/Phone";
import { Surname } from "../../../../Shared/Domain/ValueObject/PersonalData/Surname";
import { Uuid } from "../../../../Shared/Domain/ValueObject/Primitives/Uuid";
import { Workplace } from "../../../../Shared/Domain/ValueObject/Workplace/Workplace";
import { connect } from "../../../../Shared/Infrastructure/Persistence/Mysql/Connection";
import { Address } from "../../../Domain/Address";
import { IStudentRepository } from "../../../Domain/IStudentRepository";
import { LegalRepresentative } from "../../../Domain/LegalRepresentative";
import { Student } from "../../../Domain/Student";
import { Comment } from "../../../Domain/ValueObject/Comment";
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

    if (!studentDbEntity) {
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

    if (!studentDbEntity) {
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
    return new Student(
      this,
      new Uuid(studentRow.id, Student.getDomainTag()),
      new Dni(studentRow.dni, Student.getDomainTag()),
      new FirstName(studentRow.name, Student.getDomainTag()),
      new Surname(studentRow.surname, Student.getDomainTag()),
      new Surname(studentRow.second_surname, Student.getDomainTag(), true),
      new Email(studentRow.email, Student.getDomainTag(), true),
      new Phone(studentRow.phone, Student.getDomainTag(), true),
      new Birthdate(studentRow.birthdate, Student.getDomainTag()),
      new Cellphone(studentRow.cellphone, Student.getDomainTag(), true),
      new AcademicInstitution(
        studentRow.academic_institution,
        Student.getDomainTag()
      ),
      new Workplace(studentRow.workplace, Student.getDomainTag()),
      new EnglishCertificate(
        studentRow.english_certificate,
        studentRow.is_other_english_certificate,
        Student.getDomainTag()
      ),
      new Comment(studentRow.comment, Student.getDomainTag()),
      Address.getEmptyObject(),
      new LegalRepresentative(
        new FirstName(studentRow.name, LegalRepresentative.getDomainTag()),
        new Surname(studentRow.surname, LegalRepresentative.getDomainTag()),
        new Surname(
          studentRow.second_surname,
          LegalRepresentative.getDomainTag(),
          true
        ),
        new Phone(studentRow.phone, LegalRepresentative.getDomainTag(), true),
        new Cellphone(
          studentRow.cellphone,
          LegalRepresentative.getDomainTag(),
          true
        )
      )
    );
  }

  private getAddressFromPrimitives(addressRow: any): Address {
    return new Address(
      new Uuid(addressRow.id, Address.getDomainTag()),
      new Street(addressRow.street, Address.getDomainTag()),
      new Neighborhood(addressRow.neighborhood, Address.getDomainTag(), true),
      new City(addressRow.city, Address.getDomainTag()),
      new State(addressRow.state, Address.getDomainTag()),
      new Reference(addressRow.reference, Address.getDomainTag(), true)
    );
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
    };
    return addressDbEntity;
  }
}
