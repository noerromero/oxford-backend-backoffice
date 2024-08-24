import { IProfessorRepository } from "../Domain/IProfessorRepository";
import { Professor } from "../Domain/Professor";
import { connect } from "../../Shared/Infrastructure/Persistence/Mysql/Connection";
import IProfessorDb from "./dbEntity/IProfessorDb";
import { Pool } from "mysql2/promise";

export class MysqlProfessorRepository implements IProfessorRepository {
    public async findById(id: string): Promise<Professor | null> {
        const conn = await connect();
        const professorRows = await conn.query(
          "SELECT * FROM `backoffice.professor` WHERE TRIM(id) = ?",
          [id]
        );
    
        const professorDbEntity = JSON.parse(JSON.stringify(professorRows[0]));
    
        if (professorDbEntity === null || professorDbEntity.length === 0 || professorDbEntity === undefined) { 
          return null;
        }
    
        const professor = this.getProfessorFromPrimitives(professorDbEntity[0]);
    
        return professor;
      }
    
      public async existsByDni(dni: string): Promise<boolean> {
        const conn = await connect();
        const professorRows = await conn.query(
          "SELECT 1 FROM `backoffice.professor` WHERE dni = ?",
          [dni]
        );
    
        const professorDbEntity = JSON.parse(JSON.stringify(professorRows[0]));
        if (Object.keys(professorDbEntity).length === 0) {
          return false;
        }
        return true;
      }
    
      public async existsById(id: string): Promise<boolean> {
        const conn = await connect();
        const professorRows = await conn.query(
          "SELECT 1 FROM `backoffice.professor` WHERE id = ?",
          [id]
        );
        const professorDbEntity = JSON.parse(JSON.stringify(professorRows[0]));
    
        if (Object.keys(professorDbEntity).length === 0) {
          return false;
        }
        return true;
      }
    
      public async update(professor: Professor): Promise<void> {
        const professorDbEntity = this.getProfessorDbEntityFromDomain(professor);
    
        const conn = await connect();
        await this.updateProfessor(professorDbEntity, conn);
      }
    
      public async create(professor: Professor): Promise<void> {
        const professorDbEntity = this.getProfessorDbEntityFromDomain(professor);
    
        const conn = await connect();
        await this.insertProfessor(professorDbEntity, conn);
      }
    
      public async findAll(): Promise<any | null> {
        const conn = await connect();
        const professorRows = await conn.query(
          `
          SELECT 
              p.id,
            p.dni,
            p.name,
            p.surname,
            p.second_surname,
            p.email,
            p.cellphone,
            p.birthday
          FROM \`backoffice.professor\` p`,
          []
        );
    
        const professorDbEntity = JSON.parse(JSON.stringify(professorRows[0]));
    
        if (professorDbEntity === undefined) { 
          return null
        }
    
        const professors = professorDbEntity.map((professorRow: any) => {
          const professor = this.getProfessorFromPrimitives(professorRow);
          return professor;
        });
    
        return professors;
      }

      private getProfessorFromPrimitives(professorRow: any): Professor {
        const professor = Professor.fromPrimitives({
          id: professorRow.id,
          dni: professorRow.dni,
          name: professorRow.name,
          surname: professorRow.surname,
          secondSurname: professorRow.second_surname,
          email: professorRow.email,
          cellphone: professorRow.cellphone,
          birthday: professorRow.birthday,
        });
    
        return professor;
      }

      private getProfessorDbEntityFromDomain(professor: Professor): IProfessorDb {
        const plainStudent = professor.toPrimitives();
    
        const professorDbEntity: IProfessorDb = {
          id: plainStudent.id ?? null,
          dni: plainStudent.dni ?? null,
          name: plainStudent.name ?? null,
          surname: plainStudent.surname ?? null,
          second_surname: plainStudent.secondSurname ?? null,
          email: plainStudent.email ?? null,
          birthday: plainStudent.birthday ?? null,
          cellphone: plainStudent.cellphone ?? null,
        };
        return professorDbEntity;
      }

      private async updateProfessor(
        professorDbEntity: IProfessorDb,
        conn: Pool,
      ): Promise<void> {
        await conn.query("UPDATE `backoffice.professor` SET ? WHERE ID = ?", [
          professorDbEntity,
          professorDbEntity.id,
        ]);
      }

      private async insertProfessor(
        professorDbEntity: IProfessorDb,
        conn: Pool
      ): Promise<void> {
        await conn.query("INSERT INTO `backoffice.professor` SET ?", [
          professorDbEntity,
        ]);
      }
    
}