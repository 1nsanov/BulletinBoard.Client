export default class RemoveAdvertisementRequest {
  id: number = 0;
  userId: number = 0;

  constructor(obj?: Partial<RemoveAdvertisementRequest>) {
    if (obj) Object.assign(this, obj)
  }
}