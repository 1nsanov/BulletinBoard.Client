export default class AdvertisementItemDetailModel {
  id: number = 0;
  title: string = null;
  description: string = null;
  phoneNumber: string = null;
  price: number = null;
  createdDate: Date = null;
  imageUrl?: string = null;

  constructor(obj?: Partial<AdvertisementItemDetailModel>) {
    if (obj) Object.assign(this, obj)
  }
}