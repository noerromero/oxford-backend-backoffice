export class DomainResponse {
  public success: boolean;
  public data: any;

  constructor(success: boolean = false, data: any = null) {
    this.success = success;
    this.data = data;
  }
}
