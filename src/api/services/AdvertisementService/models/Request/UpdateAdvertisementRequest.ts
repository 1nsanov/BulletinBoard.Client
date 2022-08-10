export default class UpdateAdvertisementRequest {
  Id: number = 0
  Title: string = null;
  Description: string = null;
  PhoneNumber: string = null;
  Price: number = 0;
  ImageUrl?: string = null;
  CategoryId: number = 0
  SubCategoryId: number = 0
  TownId: number = 0

  constructor(obj?: Partial<UpdateAdvertisementRequest>) {
    if (obj) Object.assign(this, obj)
  }
}