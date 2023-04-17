/**
 * Dto for update user
 *
 * @export
 * @interface IUpdateUserDto
 * @typedef {IUpdateUserDto}
 */
export interface IUpdateUserDto {
  /**
   * Optional id
   *
   * @type {?string}
   */
  _id?: string;
  /**
   * document
   *
   * @type {?string}
   */
  document?: string;
  /**
   * phone
   *
   * @type {?string}
   */
  phone?: string;
}
