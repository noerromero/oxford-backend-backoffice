export class ApplicationResponse {
  public success: boolean;
  public data: any;
  public message: string;

  constructor(
    success: boolean = false,
    message: string = "",
    data: any = null
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
