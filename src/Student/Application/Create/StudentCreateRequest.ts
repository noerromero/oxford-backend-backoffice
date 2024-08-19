import { AddressRequest } from "../Common/AddressRequest";
import { LegalRepresentativeRequest } from "../Common/LegalRepresentativeRequest";

export class StudentCreateRequest {
  public id: string = "";
  public dni: string = "";
  public name: string = "";
  public surname: string = "";
  public secondSurname: string = "";
  public email: string = "";
  public phone: string = "";
  public birthday: string = "";
  public cellphone: string = "";
  public academicInstitution: string = "";
  public workplace: string = "";
  public englishCertificate: string = "";
  public comment: string = "";
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
