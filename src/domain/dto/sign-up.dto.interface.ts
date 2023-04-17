/**
 * Dto for sign up
 *
 * @export
 * @interface ISignUpDto
 * @typedef {ISignUpDto}
 */
export interface ISignUpDto {
  /**
   * firebase id
   *
   * @type {string}
   */
  firebaseId: string;
  /**
   * email
   *
   * @type {string}
   */
  email: string;
  /**
   * name
   *
   * @type {string}
   */
  name: string;
  /**
   * document
   *
   * @type {string}
   */
  document: string;
  /**
   * phone
   *
   * @type {string}
   */
  phone: string;
}
