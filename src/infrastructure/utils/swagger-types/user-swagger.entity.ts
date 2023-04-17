import { ApiProperty } from '@nestjs/swagger';

/**
 * User swagger entity class that represents the user entity in the swagger documentation
 *
 * @export
 * @class UserSwaggerEntity
 * @typedef {UserSwaggerEntity}
 */
export class UserSwaggerEntity {
  /**
   * Id of the user
   *
   * @type {?string}
   */
  @ApiProperty()
  _id?: string;
  /**
   * Firebase id of the user
   *
   * @type {string}
   */
  @ApiProperty()
  firebaseId: string;
  /**
   * Email of the user
   *
   * @type {string}
   */
  @ApiProperty()
  email: string;
  /**
   * Name of the user
   *
   * @type {string}
   */
  @ApiProperty()
  name: string;
  /**
   * Document of the user
   *
   * @type {string}
   */
  @ApiProperty()
  document: string;
  /**
   * Phone of the user
   *
   * @type {string}
   */
  @ApiProperty()
  phone: string;
}
