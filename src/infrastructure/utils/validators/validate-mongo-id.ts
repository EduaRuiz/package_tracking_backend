import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

/**
 * Validate Mongo ID class
 *
 * @export
 * @class ValidateMongoId
 * @typedef {ValidateMongoId}
 * @implements {PipeTransform<string>}
 */
@Injectable()
export class ValidateMongoId implements PipeTransform<string> {
  /**
   * Description placeholder
   *
   * @param {string} value The value to transform
   * @param {ArgumentMetadata} metadata The ArgumentMetadata
   * @returns {string} The transformed value
   */
  transform(value: string, metadata: ArgumentMetadata): string {
    const isValid = ObjectId.isValid(value);
    const isValidString = isValid
      ? String(new ObjectId(value)) === value
      : false;
    return isValid && isValidString ? value : this.throwError();
  }

  /**
   * Throws an error
   *
   * @private
   * @returns {never} The error thrown by the function
   */
  private throwError(): never {
    throw new BadRequestException('Invalid Mongo ID');
  }
}
