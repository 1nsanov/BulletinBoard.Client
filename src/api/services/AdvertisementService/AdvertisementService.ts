import BaseResponse from "../../models/BaseResponse";
import BaseResponseT from "../../models/BaseResponseT";
import AdvertisementItemDetailModel from "./models/AdvertisementItemDetailModel";
import AdvertisementListItemModel from "./models/AdvertisementListItemModel";
import CreateAdvertisementRequest from "./models/Request/CreateAdvertisementRequest";
import GetAdvertisementDetailRequest from "./models/Request/GetAdvertisementDetailRequest";
import GetAdvertisementListRequest from "./models/Request/GetAdvertisementListRequest";
import RemoveAdvertisementRequest from "./models/Request/RemoveAdvertisementRequest";

export default class AdvertisementService {
  private apiUrl: string = "";

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async GetAdvertisementList(request?: GetAdvertisementListRequest): Promise<BaseResponseT<AdvertisementListItemModel[]>> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "GetAdvertisementList", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(!!request ? request : {})
      })

      var result = await this.objectFromJSON(res) as BaseResponseT<AdvertisementListItemModel[]>;
      rs(result);
    })
  }

  async GetAdvertisementDetail(request: GetAdvertisementDetailRequest): Promise<BaseResponseT<AdvertisementItemDetailModel>> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "GetAdvertisementDetail", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      })

      var result = await this.objectFromJSON(res) as BaseResponseT<AdvertisementItemDetailModel>;
      rs(result);
    })
  }

  async CreateAdvertisement(request: CreateAdvertisementRequest): Promise<BaseResponse> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "CreateAdvertisement", {
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

  async UpdateAdvertisement(request: CreateAdvertisementRequest): Promise<BaseResponse> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "UpdateAdvertisement", {
        method: "PUT",
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

  async RemoveAdvertisement(request: RemoveAdvertisementRequest): Promise<BaseResponse> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "RemoveAdvertisement", {
        method: "DELETE",
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