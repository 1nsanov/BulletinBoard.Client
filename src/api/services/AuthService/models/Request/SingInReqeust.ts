export default class SingInReqeust {
  userName: string = null;
  password: string = null;

  constructor(obj?: Partial<SingInReqeust>) {
    if (obj) Object.assign(this, obj)
  }
}