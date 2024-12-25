export class ApiResponse {
  data: any;
  code: any;

  constructor(data: any, code: any) {
    this.data = data;
    this.code = code;
  }
}
