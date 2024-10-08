import { Professor } from "./Professor";

export interface IProfessorRepository {
    create(entity: Professor): Promise<void>;
    update(entity: Professor): Promise<void>;
    findAll(): Promise<Professor[] | null>;
    findById(id: string): Promise<Professor | null>;
    delete(id: string): Promise<void>;
    existsByDni(dni: string): Promise<boolean>;
    existsById(id: string): Promise<boolean>;
  }
  