export class ApplicationResponse<T = string> {
    public success: boolean;
    public data: Array<T>;
    public message: string;

    constructor(
        success: boolean = false,
        message: string = "",
        data: Array<T> = []
    ) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}