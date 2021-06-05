export class UserLoginDto {
  /**
   * User nickname
   *
   * @example TestUser
   */
  nickname: string;

  /**
   * User e-mail
   *
   * @example test_user@yandex.ru
   */
  email: string;

  /**
   * User balance
   *
   * @example 152.12
   */
  balance: number;

  /**
   * CloakS available
   *
   * @example true
   */
  cloak_unlock: boolean;

  /**
   * HD skins available
   *
   * @example false
   */
  hd_skin_unlock: boolean;

  /**
   * Is the user an administrator
   *
   * @example false
   */
  is_admin: boolean;

  /**
   * User UUID
   *
   * @example 1b466391-951a-4ed4-a96f-63791b68925d
   */

  uuid: string;
}
