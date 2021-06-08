import { UserLoginDto } from './user-login.dto';

export class AuthLoginResponseDto {
  User: UserLoginDto;

  /**
   * JWT user token (further passed in header authorization: Bearer <token>)
   *
   * @example eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ.-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM
   */
  access_token: string;
}
