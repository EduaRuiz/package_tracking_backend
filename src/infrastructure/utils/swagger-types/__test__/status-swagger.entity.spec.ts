import { StatusSwaggerEntity } from '..';

describe('StatusSwaggerEntity', () => {
  it('should create an instance of StatusSwaggerEntity with the correct values', () => {
    // Arrange and Act
    const statusSwaggerEntity = new StatusSwaggerEntity();

    // Assert
    expect(statusSwaggerEntity).toBeInstanceOf(StatusSwaggerEntity);
  });
});
