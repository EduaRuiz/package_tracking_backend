import { StatusEntity, UserEntity } from '@infrastructure/persistance/entities';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Shipment Swagger Entity class to generate swagger documentation
 *
 * @export
 * @class ShipmentSwaggerEntity
 * @typedef {ShipmentSwaggerEntity}
 */
export class ShipmentSwaggerEntity {
  /**
   * Id of the shipment
   *
   * @type {number}
   */
  @ApiProperty()
  _id: number;
  /**
   * User of the shipment
   *
   * @type {UserEntity}
   */
  @ApiProperty()
  user: UserEntity;
  /**
   * Description of the shipment
   *
   * @type {string}
   */
  @ApiProperty()
  description: string;
  /**
   * Origin address of the shipment
   *
   * @type {string}
   */
  @ApiProperty()
  originAddress: string;
  /**
   * Destination address of the shipment
   *
   * @type {string}
   */
  @ApiProperty()
  destinationAddress: string;
  /**
   * Status of the shipment
   *
   * @type {StatusEntity}
   */
  @ApiProperty()
  status: StatusEntity;
  /**
   * Date of creation of the shipment
   *
   * @type {Date}
   */
  @ApiProperty()
  createdAt: Date;
  /**
   * Date of last update of the shipment
   *
   * @type {Date}
   */
  @ApiProperty()
  updatedAt: Date;
}
