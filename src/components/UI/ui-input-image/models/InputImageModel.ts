export default class InputImageModel {
  SrcUrl: string = null;
  Base64: string = null;

  constructor(obj?: Partial<InputImageModel>) {
    if (obj) Object.assign(this, obj)
  }
}