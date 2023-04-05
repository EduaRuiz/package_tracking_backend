import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ValidateMongoId implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    const isValid = ObjectId.isValid(value);
    const isValidString = isValid
      ? String(new ObjectId(value)) === value
      : false;
    if (isValid && isValidString) {
      return value;
    }
    throw new BadRequestException('Invalid Mongo ID');
  }
}
