import { Course } from "./Course";

export interface ICourseRepository {
    create(entity: Course): Promise<void>;
    update(entity: Course): Promise<void>;
    findAll(): Promise<Course[] | null>;
    findById(id: string): Promise<Course | null>;
    delete(id: string): Promise<void>;
    existsByName(name: string): Promise<boolean>;
    existsById(id: string): Promise<boolean>;
  }
  