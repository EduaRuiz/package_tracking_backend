import { IUserDomainEntity } from './interfaces';

/**
 * User Domain Entity class
 *
 * @export
 * @class UserDomainEntity
 * @typedef {UserDomainEntity}
 * @implements {IUserDomainEntity}
 */
export class UserDomainEntity implements IUserDomainEntity {
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

  /**
   * Creates an instance of UserDomainEntity.
   *
   * @constructor
   * @param {string} firebaseId Firebase id of the user
   * @param {string} email Email of the user
   * @param {string} name Name of the user
   * @param {string} document Document of the user
   * @param {string} phone Phone of the user
   * @param {?string} [_id] Id of the user
   */
  constructor(
    firebaseId: string,
    email: string,
    name: string,
    document: string,
    phone: string,
    _id?: string,
  ) {
    this._id = _id;
    this.firebaseId = firebaseId;
    this.email = email;
    this.name = name;
    this.document = document;
    this.phone = phone;
  }
}
