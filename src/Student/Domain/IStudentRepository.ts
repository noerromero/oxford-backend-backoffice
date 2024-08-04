import { Student } from "./Student";

export interface IStudentRepository {
  create(entity: Student): Promise<void>;
  update(entity: Student): Promise<void>;
  findAll(): Promise<Student[] | null>;
  findById(id: string): Promise<Student | null>;
  existsByDni(dni: string): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
}
