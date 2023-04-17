import { StatusDomainEntity, UserDomainEntity } from '.';
import { IShipmentDomainEntity } from './interfaces';

/**
 * Shipment Domain Entity class
 *
 * @export
 * @class ShipmentDomainEntity
 * @typedef {ShipmentDomainEntity}
 * @implements {IShipmentDomainEntity}
 */
export class ShipmentDomainEntity implements IShipmentDomainEntity {
  /**
   * Id of the shipment
   *
   * @type {?string}
   */
  _id?: string;
  /**
   * User of the shipment
   *
   * @type {UserDomainEntity}
   */
  user: UserDomainEntity;
  /**
   * Description of the shipment
   *
   * @type {string}
   */
  description: string;
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
   * @type {StatusDomainEntity}
   */
  status: StatusDomainEntity;
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

  /**
   * Creates an instance of ShipmentDomainEntity.
   *
   * @constructor
   * @param {UserDomainEntity} user The user of the shipment
   * @param {string} description The description of the shipment
   * @param {string} originAddress The origin address of the shipment
   * @param {string} destinationAddress The destination address of the shipment
   * @param {StatusDomainEntity} status The status of the shipment
   * @param {Date} createdAt The date of the creation of the shipment
   * @param {Date} updatedAt The date of the last update of the shipment
   * @param {?string} [_id] The id of the shipment
   */
  constructor(
    user: UserDomainEntity,
    description: string,
    originAddress: string,
    destinationAddress: string,
    status: StatusDomainEntity,
    createdAt: Date,
    updatedAt: Date,
    _id?: string,
  ) {
    this._id = _id;
    this.description = description;
    this.user = user;
    this.originAddress = originAddress;
    this.destinationAddress = destinationAddress;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
