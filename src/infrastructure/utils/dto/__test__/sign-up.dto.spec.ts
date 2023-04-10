import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SignUpDto } from '..';

describe('SignUpDto', () => {
  let dto: SignUpDto;
  const validData = {
    firebaseId: 'vZcewrdlV72DHVWORTEa',
    email: 'test@example.com',
    name: 'John Doe ',
    document: '1234567',
    phone: '1234567',
  };

  const invalidData = {
    firebaseId: 'invalid_id',
    email: 'not_an_email',
    name: '',
    document: '12345',
    phone: '123456789012345',
  };

  describe('when validating SignUpDto', () => {
    beforeEach(() => {
      dto = undefined;
    });

    it('should be defined', () => {
      // Arrange & Act
      dto = new SignUpDto();

      // Assert
      expect(dto).toBeDefined();
    });

    describe('and validating valid data', () => {
      it('should not have errors', async () => {
        let errors: any[];
        // Arrange
        dto = plainToInstance(SignUpDto, validData);

        // Act
        errors = await validate(dto);

        // Assert
        expect(errors.length).toBe(0);
      });
    });

    describe('and validating invalid data', () => {
      let errors: any[];

      const expectedErrors = {
        firebaseId: 'FirebaseId is not valid',
        email: 'email must be an email',
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
      });
    });
  });
});
