import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from '..';

describe('UpdateUserDto', () => {
  let dto: UpdateUserDto;
  const validData = {
    _id: '619b7d6a2e6f7a6e1c6a7d1d',
    name: 'John Doe',
    phone: '1234567',
  };

  const invalidData = {
    _id: 'invalid-id',
    name: '',
    phone: 'abc123',
  };

  describe('when validating UpdateUserDto', () => {
    beforeEach(() => {
      dto = undefined;
    });

    it('should be defined', () => {
      // Arrange & Act
      dto = new UpdateUserDto();

      // Assert
      expect(dto).toBeDefined();
    });

    describe('and validating valid data', () => {
      let errors: any[];

      beforeEach(async () => {
        // Arrange
        dto = plainToClass(UpdateUserDto, validData);

        // Act
        errors = await validate(dto);
      });

      it('should not have errors', () => {
        // Assert
        expect(errors.length).toBe(0);
      });
    });

    describe('and validating invalid data', () => {
      let errors: any[];

      const expectedErrors = {
        _id: 'id must be a mongodb id',
        name: 'name should not be empty',
        phone: 'phone must be a number string',
      };

      beforeEach(async () => {
        // Arrange
        dto = plainToClass(UpdateUserDto, invalidData);

        // Act
        errors = await validate(dto);
      });

      it('should have errors', () => {
        // Assert
        expect(errors.length).toBeGreaterThan(0);
      });

      it('should have expected errors', () => {
        // Assert
        expect(JSON.stringify(errors)).toContain(expectedErrors._id);
        expect(JSON.stringify(errors)).toContain(expectedErrors.name);
        expect(JSON.stringify(errors)).toContain(expectedErrors.phone);
      });
    });
  });
});
