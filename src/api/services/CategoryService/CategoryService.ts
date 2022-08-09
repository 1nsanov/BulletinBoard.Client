import BaseResponse from "../models/BaseResponse";
import BaseResponseT from "../models/BaseResponseT";
import CreateCategoryRequest from "./models/Request/CreateCategoryRequest";
import RemoveCategoryRequest from "./models/Request/RemoveCategoryRequest";
import UpdateCategoryRequest from "./models/Request/UpdateCategoryRequest";
import GetAllCategoryResponse from "./models/Response/GetAllCategoryResponse";

export default class CategoryService {
  private apiUrl: string = "";

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl + /category/;
  }

  async GetAllCategory(): Promise<BaseResponseT<GetAllCategoryResponse[]>> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "GetAllCategory", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
      })

      var result = await this.objectFromJSON(res) as BaseResponseT<GetAllCategoryResponse[]>;
      rs(result);
    })
  }

  async CreateCategory(request: CreateCategoryRequest): Promise<BaseResponse> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "CreateCategory", {
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

  async UpdateCategory(request: UpdateCategoryRequest): Promise<BaseResponse> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "UpdateCategory", {
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

  async RemoveCategory(request: RemoveCategoryRequest): Promise<BaseResponse> {
    return new Promise(async (rs, rj) => {
      const res = fetch(this.apiUrl + "RemoveCategory", {
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