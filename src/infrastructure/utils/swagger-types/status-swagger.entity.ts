import { ApiProperty } from '@nestjs/swagger';

/**
 * Status swagger entity class that represents the status entity in the swagger documentation
 *
 * @export
 * @class StatusSwaggerEntity
 * @typedef {StatusSwaggerEntity}
 */
export class StatusSwaggerEntity {
  /**
   * Id of the status
   *
   * @type {?string}
   */
  @ApiProperty()
  _id?: string;
  /**
   * Name of the status
   *
   * @type {string}
   */
  @ApiProperty()
  name: string;
  /**
   * Description of the status
   *
   * @type {string}
   */
  @ApiProperty()
  description: string;
}
