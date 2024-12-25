export class TokenResponse {
  refresh: string;
  access: string;

  constructor(refresh: string, access: string) {
    this.refresh = refresh;
    this.access = access;
  }
}
