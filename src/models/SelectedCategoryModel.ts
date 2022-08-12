
export default class SelectedCategoryModel {
  Id: number = 0;
  Name: string = "";
  Image: string = null;
  ParentId?: number = null;

  constructor(obj?: Partial<SelectedCategoryModel>) {
    if (obj) Object.assign(this, obj)
  }
}