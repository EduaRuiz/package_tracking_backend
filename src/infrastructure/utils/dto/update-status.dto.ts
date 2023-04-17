import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { IUpdateStatusDto } from 'src/domain/dto';

/**
 * Update Status Dto class
 *
 * @export
 * @class UpdateStatusDto
 * @typedef {UpdateStatusDto}
 * @implements {IUpdateStatusDto}
 */
export class UpdateStatusDto implements IUpdateStatusDto {
  /**
   * Id, it is optional and it has to be a string and it has to be defined and it has to be not empty
   * and it has to be a valid mongo id
   *
   * @type {?string}
   */
  @IsOptional()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  _id?: string;

  /**
   * Description, it has to be a string and it has to be defined and it has to be not empty
   * and it has to have a maximum length of 100 characters
   *
   * @type {string}
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  description: string;
}
