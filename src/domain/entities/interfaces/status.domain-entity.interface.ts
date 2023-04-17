import { IShipmentDomainEntity } from '.';

/**
 * Status Domain Entity interface
 *
 * @export
 * @interface IStatusDomainEntity
 * @typedef {IStatusDomainEntity}
 */
export interface IStatusDomainEntity {
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
}
