import { IUserDomainService } from 'src/domain/services';
import { of, throwError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { user } from './';
import { IUseCase } from '../../interface';
import { UpdateUserUseCase } from '..';
import { updateUserDto } from './mocks';

describe('UpdateUserUseCase', () => {
  let user$: IUserDomainService;
  let updateUserUseCase: IUseCase;

  beforeEach(() => {
    user$ = {
      getUserById: jest.fn(),
      updateUser: jest.fn(),
    } as unknown as IUserDomainService;
    updateUserUseCase = new UpdateUserUseCase(user$);
  });

  it('should be defined', () => {
    // Assert
    expect(updateUserUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return the updated user entity', (done) => {
      // Arrange
      const userEntity = user;
      const userId = userEntity._id;
      const dto = updateUserDto;
      updateUserDto._id = userId;
      const updatedUser = { ...userEntity, ...dto, _id: userId };
      jest.spyOn(user$, 'getUserById').mockReturnValueOnce(of(userEntity));
      jest.spyOn(user$, 'updateUser').mockReturnValueOnce(of(updatedUser));

      // Act
      const result$ = updateUserUseCase.execute(dto, userId);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual({
            ...userEntity,
            ...dto,
          });
          expect(user$.getUserById).toHaveBeenCalledWith(userId);
          expect(user$.updateUser).toHaveBeenCalledWith(userId, {
            ...userEntity,
            ...dto,
          });
          done();
        },
      });
    });

    it('should throw NotFoundException when user is not found', (done) => {
      // Arrange
      const dto = updateUserDto;
      const userId = updateUserDto._id;
      jest
        .spyOn(user$, 'getUserById')
        .mockReturnValueOnce(throwError(() => new NotFoundException()));

      // Act
      const result$ = updateUserUseCase.execute(dto, userId);

      // Assert
      result$.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(user$.getUserById).toHaveBeenCalledWith(userId);
          expect(user$.updateUser).not.toHaveBeenCalled();
          done();
        },
      });
    });

    it('should update the user entity with the given dto with undefined data', (done) => {
      // Arrange
      const userEntity = user;
      const userId = userEntity._id;
      const dto = updateUserDto;
      dto.document = undefined;
      dto.phone = undefined;
      dto._id = userId;
      const updatedUser = { ...userEntity, ...dto, _id: userId };
      jest.spyOn(user$, 'getUserById').mockReturnValueOnce(of(userEntity));
      jest.spyOn(user$, 'updateUser').mockReturnValueOnce(of(updatedUser));

      // Act
      const result$ = updateUserUseCase.execute(dto, userId);

      // Assert
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual({
            ...userEntity,
            ...dto,
          });
          expect(user$.getUserById).toHaveBeenCalledWith(userId);
          expect(user$.updateUser).toHaveBeenCalledWith(userId, {
            ...userEntity,
            ...dto,
          });
          done();
        },
      });
    });
  });
});
