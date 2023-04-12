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
    console.log(value);
    const isValid = ObjectId.isValid(value);
    const isValidString = isValid
      ? String(new ObjectId(value)) === value
      : false;
    return isValid && isValidString ? value : this.throwError();
  }

  private throwError(): never {
    throw new BadRequestException('Invalid Mongo ID');
  }
}
