import { IStatusDomainEntity, IUserDomainEntity } from '.';

/**
 * Shipment Domain Entity interface
 *
 * @export
 * @interface IShipmentDomainEntity
 * @typedef {IShipmentDomainEntity}
 */
export interface IShipmentDomainEntity {
  /**
   * Id of the shipment
   *
   * @type {?string}
   */
  _id?: string;
  /**
   * Description of the shipment
   *
   * @type {string}
   */
  description: string;
  /**
   * User of the shipment
   *
   * @type {IUserDomainEntity}
   */
  user: IUserDomainEntity;
  /**
   * Origin address of the shipment
   *
   * @type {string}
   */
  originAddress: string;
  /**
   * Destination address of the shipment
   *
   * @type {string}
   */
  destinationAddress: string;
  /**
   * Status of the shipment
   *
   * @type {IStatusDomainEntity}
   */
  status: IStatusDomainEntity;
  /**
   * Date of the creation of the shipment
   *
   * @type {Date}
   */
  createdAt: Date;
  /**
   * Date of the last update of the shipment
   *
   * @type {Date}
   */
  updatedAt: Date;
}
