import { Student } from "./Student";

export interface IStudentRepository {
  save(entity: Student): Promise<void>;
  //search(id: string): Promise<T | null>;
}
