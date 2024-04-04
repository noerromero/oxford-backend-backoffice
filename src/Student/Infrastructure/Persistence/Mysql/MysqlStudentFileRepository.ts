import { IStudentFileRepository } from '../../../Domain/IStudentFileRepository';
import { StudentFile } from '../../../Domain/StudentFile';

export class MysqlStudentFileRepository implements IStudentFileRepository {
  async save(studentFile: StudentFile): Promise<void> {
    // Save student to MySQL
  }
}