import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ValidateMongoId } from '..';

const validateMongoId = new ValidateMongoId();

describe('ValidateMongoId', () => {
  describe('transform', () => {
    it('should return the value if it is a valid Mongo ID', () => {
      const value = '603dbef681fd2e0015c8adad';
      const metadata: ArgumentMetadata = {
        type: 'string',
        metatype: String,
      } as unknown as ArgumentMetadata;
      expect(validateMongoId.transform(value, metadata)).toEqual(value);
    });

    it('should throw BadRequestException if value is not a valid Mongo ID', () => {
      const value = 'invalid_id';
      const metadata: ArgumentMetadata = {
        type: 'string',
        metatype: String,
      } as unknown as ArgumentMetadata;
      expect(() => {
        validateMongoId.transform(value, metadata);
      }).toThrow(BadRequestException);
    });
  });
});
