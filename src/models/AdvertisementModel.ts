export default class AdvertisementModel{
  title: string = null;
  description: string = null;
  phoneNumber: string = null;
  price: number = 0;
  imageUrl?: string = null;
  userId: number = 0;
  categoryId: number = 0;
  subCategoryId?: number = 0;
  townId: number = 0;

  constructor(obj?: Partial<AdvertisementModel>) {
    if (obj) Object.assign(this, obj)
  }
}