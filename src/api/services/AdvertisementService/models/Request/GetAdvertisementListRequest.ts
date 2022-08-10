export default class GetAdvertisementListRequest {
  TownId?: number = 0;
  CategoryId?: number = 0;
  SubCategoryId?: number = 0;
  UserId?: number = 0;

  constructor(obj?: Partial<GetAdvertisementListRequest>) {
    if (obj) Object.assign(this, obj)
  }
}