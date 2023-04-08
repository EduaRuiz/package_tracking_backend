import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SignUpDto } from '..';

describe('SignUpDto', () => {
  let dto: SignUpDto;
  const validData = {
    firebaseId: '12345678901234567890',
    email: 'test@example.com',
    password: 'Test1234!',
    name: 'John Doe',
    document: '1234567',
    phone: '1234567',
  };

  const invalidData = {
    firebaseId: 'invalid_id',
    email: 'not_an_email',
    password: 'password',
    name: '',
    document: '12345',
    phone: '123456789012345',
  };

  describe('when validating SignUpDto', () => {
    beforeEach(() => {
      dto = undefined;
    });

    // it('should be defined', () => {
    //   // Arrange & Act
    //   dto = new SignUpDto();

    //   // Assert
    //   expect(dto).toBeDefined();
    // });

    // describe('and validating valid data', () => {
    //   let errors: any[];

    //   beforeEach(async () => {
    //     // Arrange
    //     dto = plainToInstance(SignUpDto, validData);

    //     // Act
    //     errors = await validate(dto);
    //   });

    //   it('should not have errors', () => {
    //     // Assert
    //     expect(errors.length).toBe(0);
    //   });
    // });

    describe('and validating invalid data', () => {
      let errors: any[];

      const expectedErrors = {
        firebaseId: 'FirebaseId is not valid',
        email: 'email must be an email',
        password: 'Password is not valid',
        name: 'name should not be empty',
        document: 'document must be a string of numbers',
        phone: 'phone must be a string of numbers',
      };

      beforeEach(async () => {
        // Arrange
        dto = plainToInstance(SignUpDto, invalidData);

        // Act
        errors = await validate(dto);
      });

      it('should have errors', () => {
        // Assert
        expect(errors.length).toBeGreaterThan(0);
      });

      it('should have expected errors', () => {
        // Assert
        expect(JSON.stringify(errors)).toContain(expectedErrors.firebaseId);
        expect(JSON.stringify(errors)).toContain(expectedErrors.email);
        expect(JSON.stringify(errors)).toContain(expectedErrors.password);
        expect(JSON.stringify(errors)).toContain(expectedErrors.name);
      });
    });
  });
});
