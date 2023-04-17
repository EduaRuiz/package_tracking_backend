/**
 * UserAuthData interface for the user auth data object returned by the API service
 *
 * @export
 * @interface IUserAuthData
 * @typedef {IUserAuthData}
 */
export interface IUserAuthData {
  /**
   * Id of the user
   *
   * @type {string}
   */
  _id: string;
  /**
   * Email of the user
   *
   * @type {string}
   */
  email: string;
  /**
   * Name of the user
   *
   * @type {string}
   */
  name: string;
}
