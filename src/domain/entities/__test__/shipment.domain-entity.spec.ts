import { ShipmentDomainEntity } from '..';

describe('ShipmentDomainEntity', () => {
  // Arrange
  const _id = '123456789';
  const description = 'description';
  const user = null;
  const originAddress = 'originAddress';
  const destinationAddress = 'destinationAddress';
  const status = null;
  const createdAt = new Date();
  const updatedAt = new Date();

  it('should be defined', () => {
    // Act
    const entity = new ShipmentDomainEntity(
      user,
      description,
      originAddress,
      destinationAddress,
      status,
      createdAt,
      updatedAt,
    );
    expect(entity).toBeDefined();
  });

  it('should defined all properties', () => {
    // Act
    const entity = new ShipmentDomainEntity(
      user,
      description,
      originAddress,
      destinationAddress,
      status,
      createdAt,
      updatedAt,
    );

    // Assert
    expect(entity.user).toBeDefined();
    expect(entity.originAddress).toBeDefined();
    expect(entity.destinationAddress).toBeDefined();
    expect(entity.status).toBeDefined();
    expect(entity.createdAt).toBeDefined();
    expect(entity.updatedAt).toBeDefined();
    expect(entity._id).toBeUndefined();
  });

  it('should defined all properties with values', () => {
    // Act
    const entity = new ShipmentDomainEntity(
      user,
      description,
      originAddress,
      destinationAddress,
      status,
      createdAt,
      updatedAt,
      _id,
    );

    // Assert
    expect(entity._id).toBe(_id);
    expect(entity.user).toBe(user);
    expect(entity.originAddress).toBe(originAddress);
    expect(entity.destinationAddress).toBe(destinationAddress);
    expect(entity.status).toBe(status);
    expect(entity.createdAt).toBe(createdAt);
    expect(entity.updatedAt).toBe(updatedAt);
  });
});
