import { StatusService } from '..';
import { StatusMongoService } from '../../databases/mongo';

describe('StatusService', () => {
  // Arrange
  let inventoryMovementService: StatusService;

  describe('when instantiated', () => {
    // Act
    it('should extend StatusMongoService class', () => {
      inventoryMovementService = new StatusService({} as any);

      // Assert
      expect(inventoryMovementService).toBeInstanceOf(StatusMongoService);
    });
  });
});
