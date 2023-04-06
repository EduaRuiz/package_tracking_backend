import { StatusEntity } from '..';

describe('StatusEntity', () => {
  let _id = '123456789';
  let name = 'name';
  let description = 'description';

  it('should be defined', () => {
    // Act
    const entity = new StatusEntity(name, description);

    // Assert
    expect(entity).toBeDefined();
  });

  it('should defined all properties', () => {
    // Act
    const entity = new StatusEntity(name, description);

    // Assert
    expect(entity.name).toBeDefined();
    expect(entity.description).toBeDefined();
    expect(entity._id).toBeUndefined();
  });

  it('should defined all properties with values', () => {
    // Act
    const entity = new StatusEntity(name, description, _id);

    // Assert
    expect(entity._id).toBe(_id);
    expect(entity.name).toBe(name);
    expect(entity.description).toBe(description);
  });
});
