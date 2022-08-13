export default class FilterAdvertisementModel {
  TownId: number = null;
  CategoryId: number = null;
  SubCategory: number = null;

  constructor(obj?: Partial<FilterAdvertisementModel>) {
    if (obj) Object.assign(this, obj)
  }
}