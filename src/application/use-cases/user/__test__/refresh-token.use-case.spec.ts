import { IAuthDomainService, IUserDomainService } from '@domain/services';
import { user, userResponse } from './mocks';
import { of, throwError } from 'rxjs';
import { RefreshTokenUseCase } from '..';
import { NotFoundException } from '@nestjs/common';

describe('RefreshTokenUseCase', () => {
  let userDomainService: IUserDomainService;
  let authDomainService: IAuthDomainService;
  let refreshTokenUseCase: RefreshTokenUseCase;
  beforeEach(() => {
    // Arrange
    userDomainService = {
      getUserById: jest.fn().mockReturnValue(of(user)),
    } as unknown as IUserDomainService;
    authDomainService = {
      generateAuthResponse: jest.fn().mockReturnValue(of(userResponse)),
    };

    // Act
    refreshTokenUseCase = new RefreshTokenUseCase(
      userDomainService,
      authDomainService,
    );
  });

  it('should be defined', () => {
    // Assert
    expect(refreshTokenUseCase).toBeDefined();
  });

  it('should refresh token successfully', (done) => {
    // Arrange
    const userId = user._id.toString();
    const expectedToken = userResponse.token;

    // Act
    const result$ = refreshTokenUseCase.execute(userId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toBe(expectedToken);
        done();
      },
    });
  });

  it('should throw an error if user does not exist', (done) => {
    // Arrange
    const userId = user._id.toString();
    const message = 'User does not exist';
    jest
      .spyOn(userDomainService, 'getUserById')
      .mockReturnValue(throwError(() => new NotFoundException(message)));

    // Act
    const result$ = refreshTokenUseCase.execute(userId);

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
