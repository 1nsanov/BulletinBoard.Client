export default class SelectOptionModel {
  Id: number = null;
  Name: string = null;

  constructor(id?: number, name?: string) {
    this.Id = id;
    this.Name = name;
  }
}