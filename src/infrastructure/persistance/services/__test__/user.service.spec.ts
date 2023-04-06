import { UserService } from '..';
import { UserMongoService } from '../../databases/mongo';

describe('UserService', () => {
  // Arrange
  let inventoryMovementService: UserService;

  describe('when instantiated', () => {
    it('should extend UserMongoService class', () => {
      // Act
      inventoryMovementService = new UserService({} as any);

      // Assert
      expect(inventoryMovementService).toBeInstanceOf(UserMongoService);
    });
  });
});
