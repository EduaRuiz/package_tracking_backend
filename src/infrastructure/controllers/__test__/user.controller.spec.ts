import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '..';
import {
  ShipmentService,
  StatusService,
  UserService,
} from '@infrastructure/persistance/services';
import { AuthService } from '@infrastructure/utils/services';
import { JwtService } from '@nestjs/jwt';
import { PackageTrackingDelegate } from '@application/delegates';
import { updateUserDto, user, userResponse } from './mocks';
import { of, throwError } from 'rxjs';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: ShipmentService,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: StatusService,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    // Assert
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should call the delegator to sign up', (done) => {
      // Arrange
      const expected = userResponse;
      const spy = jest.spyOn(PackageTrackingDelegate.prototype, 'toSignUp');
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(userResponse));

      // Act
      const result$ = controller.signUp({} as any);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should call the delegator to sign up and throw an error', (done) => {
      // Arrange
      const spy = jest.spyOn(PackageTrackingDelegate.prototype, 'toSignUp');
      const error = new Error('error');
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => error));

      // Act
      const result$ = controller.signUp({} as any);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          done();
        },
      });
    });
  });

  describe('signIn', () => {
    it('should call the delegator to sign in', (done) => {
      // Arrange
      const expected = userResponse;
      const spy = jest.spyOn(PackageTrackingDelegate.prototype, 'toSignIn');
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(userResponse));

      // Act
      const result$ = controller.signIn({} as any);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should call the delegator to sign in and throw an error', (done) => {
      // Arrange
      const spy = jest.spyOn(PackageTrackingDelegate.prototype, 'toSignIn');
      const error = new Error('error');
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => error));

      // Act
      const result$ = controller.signIn({} as any);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          done();
        },
      });
    });
  });

  describe('getUser', () => {
    it('should call the delegator to get user', (done) => {
      // Arrange
      const expected = user;
      const spy = jest.spyOn(PackageTrackingDelegate.prototype, 'toGetUser');
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(user));

      // Act
      const result$ = controller.getUser({} as any);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should call the delegator to get user and throw an error', (done) => {
      // Arrange
      const spy = jest.spyOn(PackageTrackingDelegate.prototype, 'toGetUser');
      const error = new Error('error');
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => error));

      // Act
      const result$ = controller.getUser({} as any);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          done();
        },
      });
    });
  });

  describe('createUser', () => {
    it('should call the delegator to create user', (done) => {
      // Arrange
      const expected = user;
      const spy = jest.spyOn(PackageTrackingDelegate.prototype, 'toCreateUser');
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(user));

      // Act
      const result$ = controller.createUser({} as any);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should call the delegator to create user and throw an error', (done) => {
      // Arrange
      const spy = jest.spyOn(PackageTrackingDelegate.prototype, 'toCreateUser');
      const error = new Error('error');
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => error));

      // Act
      const result$ = controller.createUser({} as any);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          done();
        },
      });
    });
  });

  describe('updateUser', () => {
    it('should call the delegator to update user', (done) => {
      // Arrange
      const expected = user;
      const dto = updateUserDto;
      const userId = 'userId';
      const spy = jest.spyOn(PackageTrackingDelegate.prototype, 'toUpdateUser');
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(user));

      // Act
      const result$ = controller.updateUser(dto, userId);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should call the delegator to update user and throw an error', (done) => {
      // Arrange
      const dto = updateUserDto;
      const userId = 'userId';
      const spy = jest.spyOn(PackageTrackingDelegate.prototype, 'toUpdateUser');
      const error = new Error('error');
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => error));

      // Act
      const result$ = controller.updateUser(dto, userId);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          done();
        },
      });
    });
  });

  describe('deleteUser', () => {
    it('should call the delegator to delete user', (done) => {
      // Arrange
      const expected = user;
      const userId = 'userId';
      const spy = jest.spyOn(PackageTrackingDelegate.prototype, 'toDeleteUser');
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(of(user));

      // Act
      const result$ = controller.deleteUser(userId);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        next: (result) => {
          expect(result).toEqual(expected);
          done();
        },
      });
    });

    it('should call the delegator to delete user and throw an error', (done) => {
      // Arrange
      const userId = 'userId';
      const spy = jest.spyOn(PackageTrackingDelegate.prototype, 'toDeleteUser');
      const error = new Error('error');
      jest
        .spyOn(PackageTrackingDelegate.prototype, 'execute')
        .mockReturnValue(throwError(() => error));

      // Act
      const result$ = controller.deleteUser(userId);

      // Assert
      expect(spy).toHaveBeenCalled();
      result$.subscribe({
        error: (err) => {
          expect(err).toEqual(error);
          done();
        },
      });
    });
  });
});
