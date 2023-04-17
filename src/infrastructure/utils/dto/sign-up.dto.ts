import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ISignUpDto } from 'src/domain/dto';

/**
 * Sign Up Dto class
 *
 * @export
 * @class SignUpDto
 * @typedef {SignUpDto}
 * @implements {ISignUpDto}
 */
export class SignUpDto implements ISignUpDto {
  /**
   * FirebaseId, it has to be a string and it has to be defined and it has to be not
   * empty and it has to match the regular expression /^[A-Za-z0-9]{20,28}$/g
   *
   * @type {string}
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Matches(new RegExp(/^[A-Za-z0-9]{20,28}$/g), {
    message: 'FirebaseId is not valid',
  })
  firebaseId: string;

  /**
   * Email, it has to be a string and it has to be defined and it has to be an email
   *
   * @type {string}
   */
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  /**
   * Name, it has to be a string and it has to be defined and it has to be not empty
   * and it has to have a minimum length of 5 characters and it has to have a maximum
   * length of 30 characters
   *
   * @type {string}
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  name: string;

  /**
   * Document, it has to be a string and it has to be defined and it has to be a number
   * string and it has to have a minimum length of 7 characters and it has to have a
   * maximum length of 10 characters
   *
   * @type {string}
   */
  @IsString()
  @IsNumberString()
  @IsDefined()
  @MinLength(7)
  @MaxLength(10)
  document: string;

  /**
   * Phone, it has to be a string and it has to be defined and it has to be a number
   * string and it has to have a minimum length of 7 characters and it has to have a
   * maximum length of 10 characters
   *
   * @type {string}
   */
  @IsString()
  @IsNumberString()
  @IsDefined()
  @MinLength(7)
  @MaxLength(10)
  phone: string;
}
