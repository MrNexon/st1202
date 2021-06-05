export class ServerPublicDto {
  /**
   * Server name
   *
   * @example "Naruto World"
   */
  name: string;

  /**
   * Server Description
   *
   * @example Описание...
   */
  description: string;

  /**
   * Address
   *
   * @example 192.186.0.0:25505
   */
  stat_url: string;

  /**
   * Number of slots
   *
   * @example 100
   */
  slots: number;

  /**
   * Current online
   *
   * @example 3
   */
  online: number;

  /**
   * Иконка сервера
   *
   * @example url
   */
  icon_src: string;
}
