import { UserPostgresEntity } from '..';

describe('UserPostgresEntity', () => {
  const id = 'id';
  const firebaseId = 'firebaseId';
  const email = 'email';
  const password = 'password';
  const name = 'name';
  const document = 'document';
  const phone = 'phone';

  it('should be defined', () => {
    expect(
      new UserPostgresEntity(
        firebaseId,
        email,
        password,
        name,
        document,
        phone,
      ),
    ).toBeDefined();
  });

  it('should be defined with id', () => {
    expect(
      new UserPostgresEntity(
        firebaseId,
        email,
        password,
        name,
        document,
        phone,
        id,
      ),
    ).toBeDefined();
  });
});
