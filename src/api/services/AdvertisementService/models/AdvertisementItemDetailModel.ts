export default class AdvertisementItemDetailModel {
  id: number = 0;
  title: string = null;
  description: string = null;
  phoneNumber: string = null;
  price: number = null;
  createdDate: Date = null;
  imageUrl?: string = null;
  categoryId: number = null;
  categoryName: string = null;
  subCategoryId?: number = null;
  subCategoryName?: string = null;
  townId: number = null;
  townName: string = null;
  userId: number = null;

  constructor(obj?: Partial<AdvertisementItemDetailModel>) {
    if (obj) Object.assign(this, obj)
  }
}