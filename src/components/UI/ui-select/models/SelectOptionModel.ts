export default class SelectOptionModel {
  Id: number = 0;
  Name: string = null;

  constructor(id: number, name: string) {
    this.Id = id;
    this.Name = name;
  }
}