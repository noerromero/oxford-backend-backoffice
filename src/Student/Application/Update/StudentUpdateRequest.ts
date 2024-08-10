import { AddressRequest } from "../Common/AddressRequest";
import { LegalRepresentativeRequest } from "../Common/LegalRepresentativeRequest";

export class StudentUpdateRequest {
  public studentId: string = "";
  public studentDni: string = "";
  public studentName: string = "";
  public studentSurname: string = "";
  public studentSecondSurname: string = "";
  public studentEmail: string = "";
  public studentPhone: string = "";
  public studentBirthdate: string = "";
  public studentCellphone: string = "";
  public studentAcademicInstitution: string = "";
  public studentWorkplace: string = "";
  public studentEnglishCertification: string = "";
  public studentComment: string = "";
  public address: AddressRequest = {
    id: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    reference: "",
  };
  public legalRepresentative: LegalRepresentativeRequest = {
    name: "",
    surname: "",
    secondSurname: "",
    phone: "",
    cellphone: "",
  };
}
