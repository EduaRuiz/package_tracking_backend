import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SignInDto } from '..';

describe('SignInDto', () => {
  let dto: SignInDto;
  const validData = {
    email: 'test@example.com',
    password: 'Abc123!@#',
  };

  const invalidData = {
    email: '',
    password: '',
  };

  describe('when validating SignInDto', () => {
    beforeEach(() => {
      dto = undefined;
    });

    it('should be defined', () => {
      // Arrange & Act
      dto = new SignInDto();

      // Assert
      expect(dto).toBeDefined();
    });

    describe('and validating valid data', () => {
      let errors: any[];

      beforeEach(async () => {
        // Arrange
        dto = plainToInstance(SignInDto, validData);

        // Act
        errors = await validate(dto);
      });

      it('should not have errors', () => {
        // Assert
        expect(errors.length).toBe(0);
      });
    });

    describe('and validating invalid data', () => {
      let errors: any[];

      const expectedErrors = {
        email: 'email should not be empty',
        password: 'password should not be empty',
      };

      beforeEach(async () => {
        // Arrange
        dto = plainToInstance(SignInDto, invalidData);

        // Act
        errors = await validate(dto);
      });

      it('should have errors', () => {
        // Assert
        expect(errors.length).toBeGreaterThan(0);
      });

      it('should have expected errors', () => {
        // Assert
        expect(JSON.stringify(errors)).toContain(expectedErrors.email);
        expect(JSON.stringify(errors)).toContain(expectedErrors.password);
      });
    });
  });
});
