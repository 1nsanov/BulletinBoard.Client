export default class CreateAdvertisementRequest {
  title: string = "";
  description: string = "";
  phoneNumber: string = "";
  price: number = 0;
  imageUrl?: string = null;
  userId: number = null;
  categoryId: number = null;
  subCategoryId?: number = null;
  townId: number = null;

  constructor(obj?: Partial<CreateAdvertisementRequest>) {
    if (obj) Object.assign(this, obj)
  }
}