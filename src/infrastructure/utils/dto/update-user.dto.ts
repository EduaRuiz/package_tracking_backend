import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IUpdateUserDto } from 'src/domain/dto';

/**
 * Update User Dto class
 *
 * @export
 * @class UpdateUserDto
 * @typedef {UpdateUserDto}
 * @implements {IUpdateUserDto}
 */
export class UpdateUserDto implements IUpdateUserDto {
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
   * Document, it is optional and it has to be a string and number, it has to be defined and it
   * has to be not empty and it has to have a minimum length of 7 characters and it has to have a
   *  maximum length of 10 characters
   *
   * @type {?string}
   */
  @IsOptional()
  @IsNumberString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(10)
  @ApiProperty()
  document?: string;

  /**
   * Phone, it is optional and it has to be a string and number, it has to be defined and it has to be
   * not empty and it has to have a minimum length of 7 characters and it has to have a
   * maximum length of 10 characters
   *
   * @type {?string}
   */
  @IsOptional()
  @IsNumberString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(10)
  @ApiProperty()
  phone?: string;
}
