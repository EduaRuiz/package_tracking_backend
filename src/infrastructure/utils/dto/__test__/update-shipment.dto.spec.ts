import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UpdateShipmentDto } from '..';

describe('UpdateShipmentDto', () => {
  let dto: UpdateShipmentDto;
  const validData = {
    _id: '619b7d6a2e6f7a6e1c6a7d1d',
    originAddress: '123 Main St',
    destinationAddress: '456 Second St',
    statusId: '619b7d6a2e6f7a6e1c6a7d1e',
  };

  const invalidData = {
    _id: 'invalid-id',
    originAddress: '',
    destinationAddress: '',
    statusId: '',
  };

  describe('when validating UpdateShipmentDto', () => {
    beforeEach(() => {
      dto = undefined;
    });

    it('should be defined', () => {
      // Arrange & Act
      dto = new UpdateShipmentDto();

      // Assert
      expect(dto).toBeDefined();
    });

    describe('and validating valid data', () => {
      let errors: any[];

      beforeEach(async () => {
        // Arrange
        dto = plainToClass(UpdateShipmentDto, validData);

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
        originAddress: 'originAddress should not be empty',
        destinationAddress: 'destinationAddress should not be empty',
        statusId: 'statusId must be a mongodb id',
      };

      beforeEach(async () => {
        // Arrange
        dto = plainToClass(UpdateShipmentDto, invalidData);

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
        expect(JSON.stringify(errors)).toContain(expectedErrors.originAddress);
        expect(JSON.stringify(errors)).toContain(
          expectedErrors.destinationAddress,
        );
        expect(JSON.stringify(errors)).toContain(expectedErrors.statusId);
      });
    });
  });
});
