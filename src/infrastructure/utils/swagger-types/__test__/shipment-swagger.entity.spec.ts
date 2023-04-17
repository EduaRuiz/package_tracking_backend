import { ShipmentSwaggerEntity } from '..';

describe('ShipmentSwaggerEntity', () => {
  it('should create an instance of ShipmentSwaggerEntity with the correct values', () => {
    // Arrange and Act
    const shipmentSwaggerEntity = new ShipmentSwaggerEntity();

    // Assert
    expect(shipmentSwaggerEntity).toBeInstanceOf(ShipmentSwaggerEntity);
  });
});
