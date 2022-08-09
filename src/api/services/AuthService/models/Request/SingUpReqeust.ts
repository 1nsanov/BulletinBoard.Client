export default class SingUpReqeust{
  userName: string = null;
  password: string = null;

  constructor(obj?: Partial<SingUpReqeust>) {
    if (obj) Object.assign(this, obj)
  }
}