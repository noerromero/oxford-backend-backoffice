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
import { StudentFolder } from "../../../Domain/StudentFolder";
import { Comment } from "../../../Domain/ValueObject/Comment";
import { IAddressDb } from "./dbEntity/IAddressDb";
import { ILegalRepresentativeDb } from "./dbEntity/ILegalRepresentativeDb";
import IStudentDb from "./dbEntity/IStudentDb";
import { IStudentFolderDb } from "./dbEntity/IStudentFolderDb";

export class MysqlStudentRepository implements IStudentRepository {
  public async findById(
    id: string,
    includeAddress: boolean = true,
    includeLegalRepresentative: boolean = true,
    includeStudentFolder: boolean = false
  ): Promise<Student | null> {
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

    if (includeAddress) {
      const addressRows = await conn.query(
        "SELECT * FROM `backoffice.address` WHERE student_id = ?",
        [id]
      );
      const addressDbEntity = JSON.parse(JSON.stringify(addressRows[0]));
      const address = this.getAddressFromPrimitives(addressDbEntity[0]);
      student.setAddress(address);
    }

    if (includeLegalRepresentative) {
      const legalRepresentativeRows = await conn.query(
        "SELECT * FROM `backoffice.legal_representative` WHERE student_id = ?",
        [id]
      );
      const legalRepresentativeDbEntity = JSON.parse(
        JSON.stringify(legalRepresentativeRows[0])
      );
      const legalRepresentative = this.getLegalRepresentativeFromPrimitives(
        legalRepresentativeDbEntity[0]
      );
      student.setLegalRepresentative(legalRepresentative);
    }

    if (includeStudentFolder) {
      const studentFolderRows = await conn.query(
        "SELECT * FROM `backoffice.student_folder` WHERE student_id = ?",
        [id]
      );
      const studentFolderDbEntity = JSON.parse(
        JSON.stringify(studentFolderRows[0])
      );
      const studentFolder = this.getStudentFolderFromPrimitives(
        studentFolderDbEntity[0]
      );
      student.setStudentFolder(studentFolder);
    }
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

    const legalRepresentativeDbEntity =
      this.getLegalRepresentativeDbEntityFromDomain(student);

    const studentFolderDbEntity =
      this.getStudentFolderDbEntityFromDomain(student);

    const conn = await connect();
    await this.updateStudent(studentDbEntity, conn);
    await this.deleteAddress(student.getId().toString(), conn);
    await this.deleteLegalRepresentative(student.getId().toString(), conn);
    await this.deleteStudentFolder(student.getId().toString(), conn);
    await this.insertAddress(addressDbEntity, conn);
    await this.insertLegalRepresentative(legalRepresentativeDbEntity, conn);
    await this.insertStudentFolder(studentFolderDbEntity, conn);
  }

  public async create(student: Student): Promise<void> {
    const studentDbEntity = this.getStudentDbEntityFromDomain(student);

    const addressDbEntity = this.getAddressDbEntityFromDomain(student);

    const legalRepresentativeDbEntity =
      this.getLegalRepresentativeDbEntityFromDomain(student);

    const studentFolderDbEntity =
      this.getStudentFolderDbEntityFromDomain(student);

    const conn = await connect();
    await this.insertStudent(studentDbEntity, conn);
    await this.insertAddress(addressDbEntity, conn);
    await this.insertLegalRepresentative(legalRepresentativeDbEntity, conn);
    await this.insertStudentFolder(studentFolderDbEntity, conn);
  }

  private async deleteAddress(studentId: string, conn: Pool): Promise<void> {
    await conn.query("DELETE FROM `backoffice.address` WHERE student_id = ?", [
      studentId,
    ]);
  }

  private async deleteLegalRepresentative(
    studentId: string,
    conn: Pool
  ): Promise<void> {
    await conn.query(
      "DELETE FROM `backoffice.legal_representative` WHERE student_id = ?",
      [studentId]
    );
  }

  private async deleteStudentFolder(
    studentId: string,
    conn: Pool
  ): Promise<void> {
    await conn.query(
      "DELETE FROM `backoffice.student_folder` WHERE student_id = ?",
      [studentId]
    );
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

  private async insertLegalRepresentative(
    legalRepresentativeDbEntity: ILegalRepresentativeDb,
    conn: Pool
  ): Promise<void> {
    await conn.query("INSERT INTO `backoffice.legal_representative` SET ?", [
      legalRepresentativeDbEntity,
    ]);
  }

  private async insertStudentFolder(
    studentFolderDbEntity: IStudentFolderDb,
    conn: Pool
  ): Promise<void> {
    await conn.query("INSERT INTO `backoffice.student_folder` SET ?", [
      studentFolderDbEntity,
    ]);
  }

  private getStudentFromPrimitives(studentRow: any): Student {
    return new Student(
      this,
      new Uuid(studentRow.id, Student.getEntityName()),
      new Dni(studentRow.dni, Student.getEntityName()),
      new FirstName(studentRow.name, Student.getEntityName()),
      new Surname(studentRow.surname, Student.getEntityName()),
      new Surname(studentRow.second_surname, Student.getEntityName(), true),
      new Email(studentRow.email, Student.getEntityName(), true),
      new Phone(studentRow.phone, Student.getEntityName(), true),
      new Birthdate(studentRow.birthdate, Student.getEntityName()),
      new Cellphone(studentRow.cellphone, Student.getEntityName(), true),
      Address.getEmptyObject(),
      LegalRepresentative.getEmptyObject(),
      StudentFolder.getEmptyObject()
    );
  }

  private getAddressFromPrimitives(addressRow: any): Address {
    return new Address(
      new Uuid(addressRow.id, Address.getEntityName()),
      new Street(addressRow.street, Address.getEntityName()),
      new Neighborhood(addressRow.neighborhood, Address.getEntityName(), true),
      new City(addressRow.city, Address.getEntityName()),
      new State(addressRow.state, Address.getEntityName()),
      new Reference(addressRow.reference, Address.getEntityName(), true),
      new Uuid(addressRow.student_id, Address.getEntityName())
    );
  }

  private getLegalRepresentativeFromPrimitives(
    legalRepresentativeRow: any
  ): LegalRepresentative {
    return new LegalRepresentative(
      new Uuid(legalRepresentativeRow.id, LegalRepresentative.getEntityName()),
      new FirstName(
        legalRepresentativeRow.name,
        LegalRepresentative.getEntityName()
      ),
      new Surname(
        legalRepresentativeRow.surname,
        LegalRepresentative.getEntityName()
      ),
      new Surname(
        legalRepresentativeRow.second_surname,
        LegalRepresentative.getEntityName(),
        true
      ),
      new Phone(
        legalRepresentativeRow.phone,
        LegalRepresentative.getEntityName(),
        true
      ),
      new Cellphone(
        legalRepresentativeRow.cellphone,
        LegalRepresentative.getEntityName(),
        true
      ),
      new Uuid(
        legalRepresentativeRow.student_id,
        LegalRepresentative.getEntityName()
      )
    );
  }

  private getStudentFolderFromPrimitives(studentFolderRow: any): StudentFolder {
    return new StudentFolder(
      new Uuid(studentFolderRow.id, StudentFolder.getEntityName()),
      new AcademicInstitution(
        studentFolderRow.academic_institution,
        StudentFolder.getEntityName()
      ),
      new Workplace(studentFolderRow.workplace, StudentFolder.getEntityName()),
      new EnglishCertificate(
        studentFolderRow.english_certificate,
        studentFolderRow.is_other_english_certificate,
        StudentFolder.getEntityName()
      ),
      new Comment(studentFolderRow.comment, StudentFolder.getEntityName()),
      new Uuid(studentFolderRow.student_id, StudentFolder.getEntityName())
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
      student_id: student.getAddress().getStudentId().toString() ?? null,
    };
    return addressDbEntity;
  }

  private getLegalRepresentativeDbEntityFromDomain(
    student: Student
  ): ILegalRepresentativeDb {
    const legalRepresentativeDbEntity: ILegalRepresentativeDb = {
      id: student.getLegalRepresentative().getId().toString(),
      name: student.getLegalRepresentative().getName().toString() ?? null,
      surname: student.getLegalRepresentative().getSurname().toString() ?? null,
      second_surname:
        student.getLegalRepresentative().getSecondSurname().toString() ?? null,
      phone: student.getLegalRepresentative().getPhone().toString() ?? null,
      cellphone:
        student.getLegalRepresentative().getCellphone().toString() ?? null,
      student_id:
        student.getLegalRepresentative().getStudentId().toString() ?? null,
    };
    return legalRepresentativeDbEntity;
  }

  private getStudentFolderDbEntityFromDomain(
    student: Student
  ): IStudentFolderDb {
    const studentFolderDbEntity: IStudentFolderDb = {
      id: student.getStudentFolder().getId().toString(),
      academic_institution:
        student.getStudentFolder().getAcademicInstitution().toString() ?? null,
      workplace: student.getStudentFolder().getWorkplace().toString() ?? null,
      english_certificate:
        student.getStudentFolder().getEnglishCertification().toString() ?? null,
      comment: student.getStudentFolder().getComment().toString() ?? null,
      student_id: student.getStudentFolder().getStudentId().toString() ?? null,
    };
    return studentFolderDbEntity;
  }
}
