import { User } from "../../user/type/user.type";


export interface AuthLoginResponseInterface {
  User: User;
  access_token: string;
}
