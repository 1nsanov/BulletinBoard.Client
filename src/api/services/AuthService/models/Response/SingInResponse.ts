export default class SingInResponse {
  id: number = 0;
  userName: string = null;
  password: string = null;
  userRole: EnumUserRole = null;

  constructor(obj?: Partial<SingInResponse>){
    if(obj) Object.assign(this, obj)
  }
}