import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NewStatusDto } from '..';

describe('NewStatusDto', () => {
  let dto: NewStatusDto;
  const validData = {
    name: 'Delivered',
    description: 'The shipment has been delivered to the recipient.',
  };

  const invalidData = {
    name: '',
    description: 'The shipment has been delivered to the recipient.',
  };

  describe('when validating NewStatusDto', () => {
    beforeEach(() => {
      dto = undefined;
    });

    it('should be defined', () => {
      // Arrange & Act
      dto = new NewStatusDto();

      // Assert
      expect(dto).toBeDefined();
    });

    describe('and validating valid data', () => {
      let errors: any[];

      beforeEach(async () => {
        // Arrange
        dto = plainToInstance(NewStatusDto, validData);

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
        name: 'name should not be empty',
      };

      beforeEach(async () => {
        // Arrange
        dto = plainToInstance(NewStatusDto, invalidData);

        // Act
        errors = await validate(dto);
      });

      it('should have errors', () => {
        // Assert
        expect(errors.length).toBeGreaterThan(0);
      });

      it('should have expected errors', () => {
        // Assert
        expect(JSON.stringify(errors)).toContain(expectedErrors.name);
      });
    });
  });
});
