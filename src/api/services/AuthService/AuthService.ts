export default class AuthService {
  private apiUrl: string = "";

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async testMethod(): Promise<boolean> {
    return new Promise((rs, rj) => {
      const response = fetch(this.apiUrl + "/auth/SingUp", {

      })

      if (true) {
        rs(true);
      }
      else {
        rj(false)
      }
    })
  }
}