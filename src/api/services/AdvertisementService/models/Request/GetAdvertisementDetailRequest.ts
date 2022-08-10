export default class GetAdvertisementDetailRequest {
  id: number = 0;

  constructor(obj?: Partial<GetAdvertisementDetailRequest>) {
    if (obj) Object.assign(this, obj)
  }
}