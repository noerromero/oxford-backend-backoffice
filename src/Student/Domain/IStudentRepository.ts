import { Student } from "./Student";

export interface IStudentRepository {
  create(entity: Student): Promise<void>;
  //search(id: string): Promise<T | null>;
}
