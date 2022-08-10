export default class OptionModel {
  Id: number = 0;
  Name: string = null;
  IsActive: boolean = false;

  constructor(obj?: Partial<OptionModel>) {
    if (obj) Object.assign(this, obj)
  }
}