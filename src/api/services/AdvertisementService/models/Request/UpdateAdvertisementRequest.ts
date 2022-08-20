export default class UpdateAdvertisementRequest {
  id: number = 0
  title: string = null;
  description: string = null;
  phoneNumber: string = null;
  price: number = 0;
  imageUrl?: string = null;
  categoryId: number = 0
  subCategoryId: number = 0
  townId: number = 0
  userId: number = null;

  constructor(obj?: Partial<UpdateAdvertisementRequest>) {
    if (obj) Object.assign(this, obj)
  }
}