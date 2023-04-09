import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UpdateStatusDto } from '..';

describe('UpdateStatusDto', () => {
  let dto: UpdateStatusDto;
  const validData = {
    _id: '619b7d6a2e6f7a6e1c6a7d1d',
    description: 'The shipment has been delivered to the recipient.',
  };

  const invalidData = {
    _id: 'invalid-id',
    description: 'a'.repeat(101),
  };

  describe('when validating UpdateStatusDto', () => {
    beforeEach(() => {
      dto = undefined;
    });

    it('should be defined', () => {
      // Arrange & Act
      dto = new UpdateStatusDto();

      // Assert
      expect(dto).toBeDefined();
    });

    describe('and validating valid data', () => {
      let errors: any[];

      beforeEach(async () => {
        // Arrange
        dto = plainToClass(UpdateStatusDto, validData);

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
        description:
          'description must be shorter than or equal to 100 characters',
      };

      beforeEach(async () => {
        // Arrange
        dto = plainToClass(UpdateStatusDto, invalidData);

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
        expect(JSON.stringify(errors)).toContain(expectedErrors.description);
      });
    });
  });
});
