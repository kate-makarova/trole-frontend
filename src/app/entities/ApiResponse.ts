export class ApiResponse<T = any> {
  data: T;
  code: number;

  constructor(data: T, code: number) {
    this.data = data;
    this.code = code;
  }
}
