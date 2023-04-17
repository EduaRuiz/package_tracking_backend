import { IStatusDomainEntity } from './interfaces';

/**
 * Status Domain Entity class
 *
 * @export
 * @class StatusDomainEntity
 * @typedef {StatusDomainEntity}
 * @implements {IStatusDomainEntity}
 */
export class StatusDomainEntity implements IStatusDomainEntity {
  /**
   * Id of the status
   *
   * @type {?string}
   */
  _id?: string;
  /**
   * Name of the status
   *
   * @type {string}
   */
  name: string;
  /**
   * Description of the status
   *
   * @type {string}
   */
  description: string;

  /**
   * Creates an instance of StatusDomainEntity.
   *
   * @constructor
   * @param {string} name Name of the status
   * @param {string} description Description of the status
   * @param {?string} [_id] Id of the status
   */
  constructor(name: string, description: string, _id?: string) {
    this._id = _id;
    this.name = name;
    this.description = description;
  }
}
