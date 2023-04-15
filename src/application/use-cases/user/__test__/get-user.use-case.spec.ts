import { IUserDomainService } from 'src/domain/services';
import { of, throwError } from 'rxjs';
import { IUseCase } from '../../interface';
import { GetUserUseCase } from '..';
import { user } from './mocks';
import { BadRequestException } from '@nestjs/common';

describe('GetUserUseCase', () => {
  let user$: IUserDomainService;
  let getUserUseCase: IUseCase;

  beforeEach(() => {
    // Arrange
    user$ = {
      getUserById: jest.fn(),
    } as unknown as IUserDomainService;
    getUserUseCase = new GetUserUseCase(user$);
  });

  it('should be defined', () => {
    // Assert
    expect(getUserUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a user entity with the given id', (done) => {
      // Arrange
      const userId = user._id;
      const currentUserId = user._id;
      const userEntity = user;
      jest.spyOn(user$, 'getUserById').mockReturnValueOnce(of(userEntity));

      // Act
      const result$ = getUserUseCase.execute(userId, currentUserId);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(userEntity);
          expect(user$.getUserById).toHaveBeenCalledWith(userId);
          done();
        },
      });
    });

    it('should throw an error when the user is not found', (done) => {
      // Arrange
      const userId = '1';
      const currentUserId = userId;
      jest
        .spyOn(user$, 'getUserById')
        .mockReturnValueOnce(throwError(() => new Error()));

      // Act
      const result$ = getUserUseCase.execute(userId, currentUserId);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          expect(user$.getUserById).toHaveBeenCalledWith(userId);
          done();
        },
      });
    });

    it('should throw an error when the user is not the current user', (done) => {
      // Arrange
      const userId = '1';
      const currentUserId = '2';
      const message = 'Cannot get other user';
      jest
        .spyOn(user$, 'getUserById')
        .mockReturnValueOnce(throwError(() => new Error(message)));

      // Act
      const result$ = getUserUseCase.execute(userId, currentUserId);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.message).toEqual(message);
          expect(user$.getUserById).not.toHaveBeenCalledWith(userId);
          done();
        },
      });
    });
  });
});
