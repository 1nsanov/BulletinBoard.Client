export default class AdvertisementModel{
  id: number = null;
  title: string = null;
  description: string = null;
  phoneNumber: string = null;
  price: number = null;
  imageUrl?: string = null;
  userId: number = null;
  categoryId: number = null;
  subCategoryId?: number = null;
  townId: number = null;

  constructor(obj?: Partial<AdvertisementModel>) {
    if (obj) Object.assign(this, obj)
  }
}