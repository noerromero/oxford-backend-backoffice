export default interface IStudentDb {
  id: string;
  dni?: string;
  name?: string;
  surname?: string;
  second_surname?: string;
  email?: string;
  phone?: string;
  bhirtdate?: Date;
  cellphone?: string;
  academic_institution?: string;
  workplace?: string;
  english_certificate?: string;
  comment?: string;
  legal_representative_name?: string;
  legal_representative_surname?: string;
  legal_representative_second_surname?: string;
  legal_representative_phone?: string;
  legal_representative_cellphone?: string;
}
