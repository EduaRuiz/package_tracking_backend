import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { INewStatusDto } from 'src/domain/dto';

/**
 * New Status Dto class
 *
 * @export
 * @class NewStatusDto
 * @typedef {NewStatusDto}
 * @implements {INewStatusDto}
 */
export class NewStatusDto implements INewStatusDto {
  /**
   * Name, it has to be a string and it has to be defined and it has to be not empty
   *
   * @type {string}
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  /**
   * Description, it has to be a string and it has to be defined and it has to be not
   * empty and it has to have a maximum length of 100 characters
   *
   * @type {string}
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;
}
