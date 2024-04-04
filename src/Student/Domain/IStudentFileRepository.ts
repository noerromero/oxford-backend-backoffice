import { StudentFile } from "./StudentFile";

export interface IStudentFileRepository {
  save(entity: StudentFile): Promise<void>;
  //search(id: string): Promise<T | null>;
}
