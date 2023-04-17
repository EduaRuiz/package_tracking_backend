import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IRegisterNewShipmentDto } from 'src/domain/dto';

/**
 * Register New Shipment Dto class
 *
 * @export
 * @class RegisterNewShipmentDto
 * @typedef {RegisterNewShipmentDto}
 * @implements {IRegisterNewShipmentDto}
 */
export class RegisterNewShipmentDto implements IRegisterNewShipmentDto {
  /**
   * User Id, it is optional and it has to be a string and it has to be a valid mongo id
   *
   * @type {?string}
   */
  @IsOptional()
  @IsString()
  @IsMongoId()
  userId?: string;

  /**
   * Description, it has to be a string and it has to be defined and it has to be not empty
   *  and it has to have a minimum length of 10 characters
   *
   * @type {string}
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  /**
   * Origin address, it has to be a string and it has to be defined and it has to be not empty
   *  and it has to have a minimum length of 10 characters
   *
   * @type {string}
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(10)
  originAddress: string;

  /**
   * Destination address, it has to be a string and it has to be defined and it has to be not empty
   *  and it has to have a minimum length of 10 characters
   *
   * @type {string}
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(10)
  destinationAddress: string;
}
