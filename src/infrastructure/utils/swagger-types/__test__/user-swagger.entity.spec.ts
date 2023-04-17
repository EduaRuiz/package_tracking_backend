import { UserSwaggerEntity } from '..';

describe('UserSwaggerEntity', () => {
  it('should create an instance of UserSwaggerEntity with the correct values', () => {
    // Arrange and Act
    const userSwaggerEntity = new UserSwaggerEntity();

    // Assert
    expect(userSwaggerEntity).toBeInstanceOf(UserSwaggerEntity);
  });
});
