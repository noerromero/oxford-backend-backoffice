import { StudentFile } from "./StudentFile";

export interface IStudentRepository {
  save(entity: StudentFile): Promise<void>;
  //search(id: string): Promise<T | null>;
}
