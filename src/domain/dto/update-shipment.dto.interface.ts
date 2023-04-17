/**
 * Dto for update shipment
 *
 * @export
 * @interface IUpdateShipmentDto
 * @typedef {IUpdateShipmentDto}
 */
export interface IUpdateShipmentDto {
  /**
   * Optional id
   *
   * @type {?string}
   */
  _id?: string;
  /**
   * origin address
   *
   * @type {?string}
   */
  originAddress?: string;
  /**
   * destination address
   *
   * @type {?string}
   */
  destinationAddress?: string;
  /**
   * status id
   *
   * @type {?string}
   */
  statusId?: string;
}
