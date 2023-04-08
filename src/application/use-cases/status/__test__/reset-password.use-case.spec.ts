import { IUserDomainService } from 'src/domain/services';
import { IUseCase } from '../../interface';
import { resetPasswordDto, user } from './mocks';
import { of, throwError } from 'rxjs';
import { ResetPasswordUseCase } from '..';
import { NotFoundException } from '@nestjs/common';

let resetPasswordUseCase: IUseCase;
let userDomainService: IUserDomainService;
describe('ResetPasswordUseCase', () => {
  beforeEach(() => {
    userDomainService = {
      getUserById: jest.fn().mockReturnValue(of({ user })),
      resetPassword: jest.fn().mockReturnValue(of(true)),
    } as unknown as IUserDomainService;
    resetPasswordUseCase = new ResetPasswordUseCase(userDomainService);
  });

  it('should be defined', () => {
    // Assert
    expect(resetPasswordUseCase).toBeDefined();
  });

  it('should reset password successfully', (done) => {
    // Arrange
    const dto = resetPasswordDto;
    dto.userId = user._id;
    const userId = dto.userId;
    jest.spyOn(userDomainService, 'getUserById').mockReturnValue(of(user));
    jest.spyOn(userDomainService, 'resetPassword').mockReturnValue(of(user));

    // Act
    const result$ = resetPasswordUseCase.execute(dto, userId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toBe(true);
        done();
      },
    });
  });

  it('should throw NotFoundException when user does not exist', (done) => {
    // Arrange
    const dto = resetPasswordDto;
    const userId = '9999';
    const message = 'User not found';

    jest
      .spyOn(userDomainService, 'getUserById')
      .mockReturnValue(throwError(new NotFoundException(message)));

    // Act
    const result$ = resetPasswordUseCase.execute(dto, userId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(message);
        done();
      },
    });
  });

  it('should throw NotFoundException when dto.userId is different from userId', (done) => {
    // Arrange
    const dto = resetPasswordDto;
    const userId = '1234';
    const message = 'User not found';

    // Act
    const result$ = resetPasswordUseCase.execute(dto, userId);

    // Assert
    result$.subscribe({
      error: (error) => {
        expect(error.message).toBe(message);
        expect(error).toBeInstanceOf(NotFoundException);
        done();
      },
    });
  });
});
