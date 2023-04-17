import { IUserAuthData } from '.';

/**
 * UserResponse interface for the user response object returned by the API service
 *
 * @export
 * @interface IUserResponse
 * @typedef {IUserResponse}
 */
export interface IUserResponse {
  /**
   * Data, containing the user information to be used in the app
   *
   * @type {IUserAuthData}
   */
  data: IUserAuthData;
  /**
   * Token, containing the JWT token to be used in the app
   *
   * @type {string}
   */
  token: string;
}
