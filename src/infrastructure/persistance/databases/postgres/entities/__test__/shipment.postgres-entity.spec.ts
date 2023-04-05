import { ShipmentPostgresEntity } from '..';

describe('ShipmentPostgresEntity', () => {
  const id = 'id';
  const user = null;
  const originAddress = 'originAddress';
  const destinationAddress = 'destinationAddress';
  const status = null;
  const createdAt = new Date();
  const updatedAt = new Date();

  it('should be defined', () => {
    expect(
      new ShipmentPostgresEntity(
        user,
        originAddress,
        destinationAddress,
        status,
        createdAt,
        updatedAt,
      ),
    ).toBeDefined();
  });

  it('should be defined with id', () => {
    const entity = new ShipmentPostgresEntity(
      user,
      originAddress,
      destinationAddress,
      status,
      createdAt,
      updatedAt,
      id,
    );

    expect(entity).toBeDefined();
  });
});
