export class DomainResponse<T = string> {
  public success: boolean;
  public data: Array<T>;

  constructor(success: boolean = false, data: Array<T> = []) {
    this.success = success;
    this.data = data;
  }
}
