import BaseResponse from "./BaseResponse";

export default class BaseResponseT<T> implements BaseResponse{
  status: number = 0;
  message: string = "";
  isSuccess: boolean = true;
  responseCode: number = 0;
  value: T | undefined;
}