export default class AuthService {
  private apiUrl: string = "";

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  testMethod() {
    console.log("Тест метод сервиса апи", this.apiUrl);
  }
}