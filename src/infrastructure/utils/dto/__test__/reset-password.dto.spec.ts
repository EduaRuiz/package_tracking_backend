import { validate } from 'class-validator';
import { ResetPasswordDto } from '..';

describe('ResetPasswordDto', () => {
  let dto: ResetPasswordDto;

  const validData = {
    userId: '611d8b86ebf1770c40fdd6b4',
    newPassword: 'Pa$$w0rd',
    oldPassword: 'password',
  };

  const invalidData = {
    userId: 'invalid-id',
    newPassword: 'password',
    oldPassword: '',
  };

  describe('when validating ResetPasswordDto', () => {
    beforeEach(() => {
      dto = undefined;
    });

    it('should be defined', () => {
      // Arrange & Act
      dto = new ResetPasswordDto();

      // Assert
      expect(dto).toBeDefined();
    });

    describe('and validating valid data', () => {
      let errors: any[];

      beforeEach(async () => {
        // Arrange
        dto = Object.assign(new ResetPasswordDto(), validData);

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
        userId: 'userId must be a mongodb id',
        newPassword: 'Password is not valid',
        oldPassword: 'oldPassword should not be empty',
      };

      beforeEach(async () => {
        // Arrange
        dto = Object.assign(new ResetPasswordDto(), invalidData);

        // Act
        errors = await validate(dto);
      });

      it('should have errors', () => {
        // Assert
        expect(errors.length).toBeGreaterThan(0);
      });

      it('should have expected errors', () => {
        // Assert
        expect(JSON.stringify(errors)).toContain(expectedErrors.userId);
        expect(JSON.stringify(errors)).toContain(expectedErrors.newPassword);
        expect(JSON.stringify(errors)).toContain(expectedErrors.oldPassword);
      });
    });
  });
});
