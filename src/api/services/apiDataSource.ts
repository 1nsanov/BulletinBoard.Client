import AuthService from "./AuthService/AuthService";
import TownService from "./TownService/TownService";

export default class apiDataSource {
  AuthService: AuthService;
  TownService: TownService;

  constructor(apiUrl: string) {
    this.AuthService = new AuthService(apiUrl);
    this.TownService = new TownService(apiUrl);
  }
}