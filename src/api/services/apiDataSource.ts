import AuthService from "./AuthService/AuthService";

export default class apiDataSource {
  AuthService: AuthService;

  constructor(apiUrl: string) {
    this.AuthService = new AuthService(apiUrl);
  }
}