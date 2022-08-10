export default class AdvertisementListItemModel{
  id: number = 0;
  title: string = null;
  price: number = null;
  imageUrl?: string = null;

  constructor(obj?: Partial<AdvertisementListItemModel>) {
    if (obj) Object.assign(this, obj)
  }
}