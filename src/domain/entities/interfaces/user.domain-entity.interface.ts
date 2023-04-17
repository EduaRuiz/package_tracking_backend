import { IShipmentDomainEntity } from '.';

/**
 * User Domain Entity interface
 *
 * @export
 * @interface IUserDomainEntity
 * @typedef {IUserDomainEntity}
 */
export interface IUserDomainEntity {
  /**
   * Id of the user
   *
   * @type {?string}
   */
  _id?: string;
  /**
   * Firebase id of the user
   *
   * @type {string}
   */
  firebaseId: string;
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
  /**
   * Document of the user
   *
   * @type {string}
   */
  document: string;
  /**
   * Phone of the user
   *
   * @type {string}
   */
  phone: string;
}
