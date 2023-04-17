import { IsString, IsDefined, IsNotEmpty } from 'class-validator';
import { ISignInDto } from 'src/domain/dto';

/**
 * Sign In Dto class
 *
 * @export
 * @class SignInDto
 * @typedef {SignInDto}
 * @implements {ISignInDto}
 */
export class SignInDto implements ISignInDto {
  /**
   * Email, it has to be a string and it has to be defined and it has to be not empty
   *
   * @type {string}
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  email: string;

  /**
   * Firebase Id, it has to be a string and it has to be defined and it has to be not empty
   *
   * @type {string}
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  firebaseId: string;
}
