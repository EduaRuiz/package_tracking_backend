import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IUpdateShipmentDto } from 'src/domain/dto';

/**
 * Update Shipment Dto class
 *
 * @export
 * @class UpdateShipmentDto
 * @typedef {UpdateShipmentDto}
 * @implements {IUpdateShipmentDto}
 */
export class UpdateShipmentDto implements IUpdateShipmentDto {
  /**
   * Id, it is optional and it has to be a string and it has to be defined and it has to be not empty
   *
   * @type {?string}
   */
  @IsOptional()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  _id?: string;

  /**
   * Origin address, it is optional and it has to be a string and it has to be defined and it has
   *  to be not empty
   *
   * @type {?string}
   */
  @IsOptional()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(10)
  originAddress?: string;

  /**
   * Destination address, it is optional and it has to be a string and it has to be defined
   *  and it has to be not empty
   *
   * @type {?string}
   */
  @IsOptional()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(10)
  destinationAddress?: string;

  /**
   * Status Id, it is optional and it has to be a string and it has to be defined and
   * it has to be not empty
   *
   * @type {?string}
   */
  @IsOptional()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  statusId?: string;
}
