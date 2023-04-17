/**
 * Dto for update status
 *
 * @export
 * @interface IUpdateStatusDto
 * @typedef {IUpdateStatusDto}
 */
export interface IUpdateStatusDto {
  /**
   * Optional id
   *
   * @type {?string}
   */
  _id?: string;
  /**
   * Name for status
   *
   * @type {string}
   */
  description: string;
}
