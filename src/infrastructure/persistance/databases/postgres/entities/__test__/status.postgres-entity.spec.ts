import { StatusPostgresEntity } from '..';

describe('StatusPostgresEntity', () => {
  const id = 'id';
  const name = 'name';
  const description = 'description';

  it('should be defined', () => {
    expect(new StatusPostgresEntity(name, description)).toBeDefined();
  });

  it('should be defined with id', () => {
    expect(new StatusPostgresEntity(name, description, id)).toBeDefined();
  });
});
