import { StudentFile } from "../../../Domain/StudentFile";
import { IStudentFileRepository } from "../../../Domain/IStudentFileRepository";

export class DynamoStudentRepository implements IStudentFileRepository {
  save(entity: StudentFile): Promise<void> {
    console.log("Student saved");
    console.log(entity.toStringArray());
    return Promise.resolve();
  }
  search(id: string): Promise<StudentFile | null> {
    throw new Error("Method not implemented." + id);
  }
  searchAll(): Promise<StudentFile[]> {
    throw new Error("Method not implemented.");
  }
}
