import BaseResponse from "../models/BaseResponse";
import BaseResponseT from "../models/BaseResponseT";
import AddTownRequest from "./models/Request/AddTownRequest";
import RemoveTownRequest from "./models/Request/RemoveTownRequest";
import UpdateTownRequest from "./models/Request/UpdateTownRequest";
import GetAllTownResponse from "./models/Response/GetAllTownResponse";

export default class AuthService {
  private apiUrl: string = "";

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl + /town/;
  }

  async GetAllTown(): Promise<BaseResponseT<GetAllTownResponse[]>> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "GetAllTown", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
      })

      var result = await this.objectFromJSON(res) as BaseResponseT<GetAllTownResponse[]>;
      rs(result);
    })
  }

  async AddTown(request: AddTownRequest): Promise<BaseResponse> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "AddTown", {
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

  async UpdateTown(request: UpdateTownRequest): Promise<BaseResponse> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "UpdateTown", {
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

  async RemoveTown(request: RemoveTownRequest): Promise<BaseResponse> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "RemoveTown", {
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