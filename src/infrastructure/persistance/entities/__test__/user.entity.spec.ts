import { UserEntity } from '..';

describe('UserEntity', () => {
  let _id = '123456789';
  let firebaseId = 'firebaseId';
  let email = 'email';
  let password = 'password';
  let name = 'name';
  let document = 'document';
  let phone = 'phone';

  it('should be defined', () => {
    // Act
    const entity = new UserEntity(
      firebaseId,
      email,
      password,
      name,
      document,
      phone,
    );

    // Assert
    expect(entity).toBeDefined();
  });

  it('should defined all properties', () => {
    // Act
    const entity = new UserEntity(
      firebaseId,
      email,
      password,
      name,
      document,
      phone,
    );

    // Assert
    expect(entity.firebaseId).toBeDefined();
    expect(entity.email).toBeDefined();
    expect(entity.password).toBeDefined();
    expect(entity.name).toBeDefined();
    expect(entity.document).toBeDefined();
    expect(entity.phone).toBeDefined();
    expect(entity._id).toBeUndefined();
  });

  it('should defined all properties with values', () => {
    // Act
    const entity = new UserEntity(
      firebaseId,
      email,
      password,
      name,
      document,
      phone,
      _id,
    );

    // Assert
    expect(entity._id).toBe(_id);
    expect(entity.firebaseId).toBe(firebaseId);
    expect(entity.email).toBe(email);
    expect(entity.password).toBe(password);
    expect(entity.name).toBe(name);
    expect(entity.document).toBe(document);
    expect(entity.phone).toBe(phone);
  });
});
