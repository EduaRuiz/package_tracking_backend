/**
 * Dto for register new shipment
 *
 * @export
 * @interface IRegisterNewShipmentDto
 * @typedef {IRegisterNewShipmentDto}
 */
export interface IRegisterNewShipmentDto {
  /**
   * User id
   *
   * @type {?string}
   */
  userId?: string;
  /**
   * description
   *
   * @type {string}
   */
  description: string;
  /**
   * Origin address
   *
   * @type {string}
   */
  originAddress: string;
  /**
   * Destination address
   *
   * @type {string}
   */
  destinationAddress: string;
}
