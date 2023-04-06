import { ShipmentService } from '..';
import { ShipmentMongoService } from '../../databases/mongo';

describe('ShipmentService', () => {
  // Arrange
  let inventoryMovementService: ShipmentService;

  describe('when instantiated', () => {
    it('should extend ShipmentMongoService class', () => {
      // Act
      inventoryMovementService = new ShipmentService({} as any, {} as any);

      // Assert
      expect(inventoryMovementService).toBeInstanceOf(ShipmentMongoService);
    });
  });
});
