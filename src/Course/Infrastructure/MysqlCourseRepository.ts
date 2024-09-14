import { Course } from "../Domain/Course";
import { ICourseRepository } from "../Domain/ICourseRepository";
import ICourseDb from "./dbEntity/ICourseDb";
import { Pool } from "mysql2/promise";
import { connect } from "../../Shared/Infrastructure/Persistence/Mysql/Connection";

export class MysqlCourseRepository implements ICourseRepository {
    public async findById(id: string): Promise<Course | null> {
        const conn = await connect();
        const rows = await conn.query(
          "SELECT * FROM `backoffice.course` WHERE TRIM(id) = ?",
          [id]
        );
    
        const dbEntity = JSON.parse(JSON.stringify(rows[0]));
    
        if (dbEntity === null || dbEntity.length === 0 || dbEntity === undefined) { 
          return null;
        }
    
        const entity = this.getFromPrimitives(dbEntity[0]);
    
        return entity;
      }

      public async existsByName(name: string): Promise<boolean> {
        const conn = await connect();
        const rows = await conn.query(
          "SELECT 1 FROM `backoffice.course` WHERE name = ?",
          [name]
        );
        const dbEntity = JSON.parse(JSON.stringify(rows[0]));
    
        if (Object.keys(dbEntity).length === 0) {
          return false;
        }
        return true;
      }
    
      public async existsById(id: string): Promise<boolean> {
        const conn = await connect();
        const rows = await conn.query(
          "SELECT 1 FROM `backoffice.course` WHERE id = ?",
          [id]
        );
        const dbEntity = JSON.parse(JSON.stringify(rows[0]));
    
        if (Object.keys(dbEntity).length === 0) {
          return false;
        }
        return true;
      }
    
      public async update(entity: Course): Promise<void> {
        const dbEntity = this.getDbEntityFromDomain(entity);
    
        const conn = await connect();
        await this.updateEntity(dbEntity, conn);
      }
    
      public async create(entity: Course): Promise<void> {
        const dbEntity = this.getDbEntityFromDomain(entity);
    
        const conn = await connect();
        await this.insertEntity(dbEntity, conn);
      }
    
      public async findAll(): Promise<any | null> {
        const conn = await connect();
        const rows = await conn.query(
          `
          SELECT 
              p.id,
            p.name,
            p.description
          FROM \`backoffice.course\` p`,
          []
        );
    
        const dbEntity = JSON.parse(JSON.stringify(rows[0]));
    
        if (dbEntity === undefined) { 
          return null
        }
    
        const entities = dbEntity.map((row: any) => {
          const entity = this.getFromPrimitives(row);
          return entity;
        });
    
        return entities;
      }

      public async delete(id: string): Promise<void> {
        const conn = await connect();
        await conn.query("DELETE FROM `backoffice.course` WHERE id = ?", [
          id,
        ]);
      }

      private getFromPrimitives(row: any): Course {
        const entity = Course.fromPrimitives({
          id: row.id,
          name: row.name,
          description: row.description,
        });
    
        return entity;
      }

      private getDbEntityFromDomain(entity: Course): ICourseDb {
        const plainData = entity.toPrimitives();
    
        const dbEntity: ICourseDb = {
          id: plainData.id ?? null,
          name: plainData.name ?? null,
          description: plainData.description ?? null
        };
        return dbEntity;
      }

      private async updateEntity(
        professorDbEntity: ICourseDb,
        conn: Pool,
      ): Promise<void> {
        await conn.query("UPDATE `backoffice.course` SET ? WHERE ID = ?", [
          professorDbEntity,
          professorDbEntity.id,
        ]);
      }

      private async insertEntity(
        dbEntity: ICourseDb,
        conn: Pool
      ): Promise<void> {
        await conn.query("INSERT INTO `backoffice.course` SET ?", [
          dbEntity,
        ]);
      }
    
}