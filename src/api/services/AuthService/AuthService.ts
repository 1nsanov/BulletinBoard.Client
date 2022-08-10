import BaseResponse from "../../models/BaseResponse";
import BaseResponseT from "../../models/BaseResponseT";
import SingInReqeust from "./models/Request/SingInReqeust";
import SingInResponse from "./models/Response/SingInResponse";
import SingUpReqeust from "./models/Request/SingUpReqeust";
import CheckExistUserRequest from "./models/Response/CheckExistUserRequest";
import RecoveryPasswordRequest from "./models/Request/RecoveryPasswordRequest";
import cookieService from "../Cookie/cookie.service";

export default class AuthService {
  private apiUrl: string = "";

  User: SingInResponse = null;

  get IsLogin(): boolean {
    return !!this.User;
  }

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async SingUpAsync(request: SingUpReqeust): Promise<BaseResponse> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "SingUp", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      })

      var result = await this.objectFromJSON(res) as BaseResponseT<BaseResponse>;
      rs(result);
    })
  }

  async SingInAsync(request: SingInReqeust): Promise<BaseResponseT<SingInResponse>> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "SingIn", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      })

      var result = await this.objectFromJSON(res) as BaseResponseT<SingInResponse>;
      if (result.isSuccess) {
        this.User = result.value;
        this.setUserToCookie();
      }
      rs(result);
    })
  }

  async CheckExistUser(request: CheckExistUserRequest): Promise<BaseResponse> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "CheckExistUser", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      })

      var result = await this.objectFromJSON(res) as BaseResponse;
      rs(result);
    })
  }

  async RecoveryPassword(request: RecoveryPasswordRequest): Promise<BaseResponse> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "RecoveryPassword", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      })

      var result = await this.objectFromJSON(res) as BaseResponse;
      rs(result);
    })
  }

  setUserToCookie() {
    cookieService.setCookie('Auth-token', JSON.stringify(this.User));
  }

  getUserFromCookie() {
    var result = cookieService.getCookie('Auth-token');
    if (result) this.User = JSON.parse(result);
  }
  removeUserFromCookie() {
    cookieService.removeCookie('Auth-token')
  }

  async objectFromJSON(response: Promise<Response>): Promise<any> {
    var result = undefined;
    await (await response).json()
      .then(res => {
        result = res;
      })
      .catch(err => console.log(err))
    return result;
  }
}