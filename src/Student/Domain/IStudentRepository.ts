import { Student } from "./Student";

export interface IStudentRepository {
  create(entity: Student): Promise<void>;
  update(entity: Student): Promise<void>;
  findAll(): Promise<Student[]>;
  findById(
    id: string,
    includeAddress: boolean,
    includeLegalRepresentative: boolean,
    includeStudentFolder: boolean
  ): Promise<Student | null>;
  existsByDni(dni: string): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
}
