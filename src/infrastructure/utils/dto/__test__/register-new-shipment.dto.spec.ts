import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RegisterNewShipmentDto } from '..';

describe('RegisterNewShipmentDto', () => {
  let dto: RegisterNewShipmentDto;
  const validData = {
    userId: '611d8b86ebf1770c40fdd6b4',
    originAddress: '123 Main St',
    destinationAddress: '456 Second St',
  };

  const invalidData = {
    userId: 'invalid-id',
    originAddress: '',
    destinationAddress: '',
  };

  describe('when validating RegisterNewShipmentDto', () => {
    beforeEach(() => {
      dto = undefined;
    });
    it('should be defined', () => {
      // Arrange & Act
      dto = new RegisterNewShipmentDto();

      // Assert
      expect(dto).toBeDefined();
    });

    describe('and validating valid data', () => {
      let errors: any[];

      beforeEach(async () => {
        // Arrange
        dto = plainToInstance(RegisterNewShipmentDto, validData);

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
        userId: 'userId must be a mongodb id',
        originAddress: 'originAddress should not be empty',
        destinationAddress: 'destinationAddress should not be empty',
      };

      beforeEach(async () => {
        // Arrange
        dto = plainToInstance(RegisterNewShipmentDto, invalidData);

        // Act
        errors = await validate(dto);
      });

      it('should have errors', () => {
        // Assert
        expect(errors.length).toBeGreaterThan(0);
      });

      it('should have expected errors', () => {
        // Assert
        expect(JSON.stringify(errors)).toContain(expectedErrors.userId);
        expect(JSON.stringify(errors)).toContain(expectedErrors.originAddress);
        expect(JSON.stringify(errors)).toContain(
          expectedErrors.destinationAddress,
        );
      });
    });
  });
});
