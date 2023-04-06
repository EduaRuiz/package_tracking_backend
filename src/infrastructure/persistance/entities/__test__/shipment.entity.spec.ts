import { ShipmentEntity } from '..';

describe('ShipmentEntity', () => {
  // Arrange
  const _id = '5f9f1c9b9b9b9b9b9b9b9b9b';
  const user = null;
  const originAddress = 'originAddress';
  const destinationAddress = 'destinationAddress';
  const status = null;
  const createdAt = new Date();
  const updatedAt = new Date();

  it('should be defined', () => {
    // Act
    const shipmentMongoModel = new ShipmentEntity(
      user,
      originAddress,
      destinationAddress,
      status,
      createdAt,
      updatedAt,
    );

    // Assert
    expect(shipmentMongoModel).toBeDefined();
  });

  it('should defined all properties with values', () => {
    // Act
    const shipmentMongoModel = new ShipmentEntity(
      user,
      originAddress,
      destinationAddress,
      status,
      createdAt,
      updatedAt,
      _id,
    );

    // Assert
    expect(shipmentMongoModel._id).toBe(_id);
    expect(shipmentMongoModel.originAddress).toBe(originAddress);
    expect(shipmentMongoModel.destinationAddress).toBe(destinationAddress);
    expect(shipmentMongoModel.status).toBe(status);
    expect(shipmentMongoModel.createdAt).toBe(createdAt);
    expect(shipmentMongoModel.updatedAt).toBe(updatedAt);
  });
});
