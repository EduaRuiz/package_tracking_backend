import {
  IAuthDomainService,
  IShipmentDomainService,
  IStatusDomainService,
  IUserDomainService,
} from 'src/domain/services';
import { PackageTrackingDelegate } from '..';
import { of } from 'rxjs';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserUseCase,
  ResetPasswordUseCase,
  SignInUseCase,
  SingUpUseCase,
  UpdateUserUseCase,
} from '@use-cases/user';
import {
  DeleteShipmentUseCase,
  GetShipmentUseCase,
  GetShipmentsByUserUseCase,
  RegisterNewShipmentUseCase,
  UpdateShipmentUseCase,
} from '@use-cases/shipment';
import {
  DeleteStatusUseCase,
  GetStatusUseCase,
  RegisterNewStatusUseCase,
  UpdateStatusUseCase,
} from '@use-cases/status';

let packageTrackingDelegate: PackageTrackingDelegate;
let userDomainService: IUserDomainService;
let shipmentDomainService: IShipmentDomainService;
let authDomainService: IAuthDomainService;
let statusDomainService: IStatusDomainService;

describe('PackageTrackingDelegate', () => {
  beforeEach(() => {
    // Arrange
    userDomainService = {
      signIn: jest.fn(),
      signUp: jest.fn(),
      resetPassword: jest.fn(),
      getUserById: jest.fn(),
      getAllUsers: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    shipmentDomainService = {
      createShipment: jest.fn(),
      getShipmentById: jest.fn(),
      getAllShipments: jest.fn(),
      updateShipment: jest.fn(),
      deleteShipment: jest.fn(),
    };
    statusDomainService = {
      updateStatus: jest.fn(),
      getStatus: jest.fn(),
      deleteStatus: jest.fn(),
      createStatus: jest.fn(),
    };
    authDomainService = {
      generateAuthResponse: jest.fn(),
    };

    // Act
    packageTrackingDelegate = new PackageTrackingDelegate(
      userDomainService,
      shipmentDomainService,
      statusDomainService,
      authDomainService,
    );
  });

  it('should be defined', () => {
    // Assert
    expect(packageTrackingDelegate).toBeDefined();
  });

  it('should sign in successfully', (done) => {
    // Arrange
    packageTrackingDelegate.toSignIn();
    const username = 'test-user';
    const password = 'test-password';
    jest
      .spyOn(authDomainService, 'generateAuthResponse')
      .mockReturnValue(of({ username, password } as any));

    jest
      .spyOn(userDomainService, 'signIn')
      .mockReturnValue(of({ username, password } as any));

    // Act
    const result$ = packageTrackingDelegate.execute(username, password);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toBeTruthy();
        expect(authDomainService.generateAuthResponse).toHaveBeenCalledWith({
          username,
          password,
        });
        done();
      },
    });
  });

  it('should sign up successfully', (done) => {
    // Arrange
    packageTrackingDelegate.toSignUp();
    const username = 'test-user';
    const password = 'test-password';
    jest
      .spyOn(userDomainService, 'signUp')
      .mockReturnValue(of({ username, password } as any));
    jest
      .spyOn(authDomainService, 'generateAuthResponse')
      .mockReturnValue(of({ username, password } as any));
    jest
      .spyOn(userDomainService, 'getUserById')
      .mockReturnValue(of({ username, password } as any));

    jest.spyOn(userDomainService, 'getAllUsers').mockReturnValue(of([]));

    // Act
    const result$ = packageTrackingDelegate.execute(username, password);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toBeTruthy();
        expect(userDomainService.signUp).toHaveBeenCalledWith(username);
        expect(authDomainService.generateAuthResponse).toHaveBeenCalledWith({
          username,
          password,
        });
        done();
      },
    });
  });

  it('should register new shipment successfully', (done) => {
    // Arrange
    packageTrackingDelegate.toRegisterNewShipment();
    const shipmentId = '1234';
    const userId = '5678';
    jest
      .spyOn(shipmentDomainService, 'createShipment')
      .mockReturnValue(of({ id: shipmentId, status: 'Delivered' } as any));
    jest
      .spyOn(userDomainService, 'getUserById')
      .mockReturnValue(of({ _id: userId } as any));

    // Act
    const result$ = packageTrackingDelegate.execute(shipmentId, userId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toBeTruthy();
        expect(shipmentDomainService.createShipment).toHaveBeenCalledTimes(1);
        done();
      },
    });
  });

  it('should get shipment successfully', (done) => {
    // Arrange
    packageTrackingDelegate.toGetShipment();
    const shipmentId = '1234';
    jest.spyOn(shipmentDomainService, 'getShipmentById').mockReturnValue(
      of({
        _id: shipmentId,
        status: 'Delivered',
        user: { _id: '123' },
      } as any),
    );
    jest
      .spyOn(userDomainService, 'getAllUsers')
      .mockReturnValue(of([{ _id: '123' } as any]));
    jest
      .spyOn(userDomainService, 'getUserById')
      .mockReturnValue(of({ _id: '123' } as any));

    // Act
    const result$ = packageTrackingDelegate.execute(shipmentId, '123');

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toEqual({
          _id: '1234',
          status: 'Delivered',
          user: { _id: '123' },
        });
        expect(shipmentDomainService.getShipmentById).toHaveBeenCalledWith(
          shipmentId,
        );
        done();
      },
    });
  });

  it('should get shipments by user successfully', (done) => {
    // Arrange
    packageTrackingDelegate.toGetShipmentsByUser();
    const userId = '123';
    jest
      .spyOn(shipmentDomainService, 'getAllShipments')
      .mockReturnValue(
        of([{ _id: '1234', status: 'Delivered', user: { _id: '123' } } as any]),
      );
    jest
      .spyOn(userDomainService, 'getUserById')
      .mockReturnValue(of({ _id: userId } as any));

    // Act
    const result$ =
      packageTrackingDelegate.execute<{ id: string; status: string }[]>(userId);

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toEqual([
          { _id: '1234', status: 'Delivered', user: { _id: '123' } },
        ]);
        expect(shipmentDomainService.getAllShipments).toHaveBeenCalledWith();
        done();
      },
    });
  });

  it('should reset password successfully', (done) => {
    // Arrange
    packageTrackingDelegate.toResetPassword();
    const userId = '123';
    const oldPassword = 'test-user';
    const newPassword = 'test-newPassword';
    jest
      .spyOn(userDomainService, 'getUserById')
      .mockReturnValue(of({ oldPassword, newPassword, _id: userId } as any));

    jest
      .spyOn(userDomainService, 'resetPassword')
      .mockReturnValue(of({ oldPassword, newPassword } as any));

    // Act
    const result$ = packageTrackingDelegate.execute(
      { oldPassword, newPassword },
      userId,
    );

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toBeTruthy();
        expect(userDomainService.getUserById).toHaveBeenCalledWith(userId);
        expect(userDomainService.resetPassword).toHaveBeenCalledWith(
          userId,
          oldPassword,
          newPassword,
        );
        done();
      },
    });
  });

  it('should update shipment status successfully', (done) => {
    // Arrange
    packageTrackingDelegate.toUpdateShipment();
    const shipmentId = '1234';
    const status = { _id: 'statusId', name: 'Delivered' };
    const updatedAt: Date = new Date();
    jest
      .spyOn(shipmentDomainService, 'updateShipment')
      .mockReturnValue(of({ _id: shipmentId, status, updatedAt } as any));
    jest
      .spyOn(shipmentDomainService, 'getShipmentById')
      .mockReturnValue(of({ _id: shipmentId } as any));
    jest
      .spyOn(statusDomainService, 'getStatus')
      .mockReturnValue(of(status as any));

    // Act
    const result$ = packageTrackingDelegate.execute(shipmentId, {
      statusId: 'statusId',
    });

    // Assert
    result$.subscribe({
      next: (result) => {
        expect(result).toBeTruthy();
        done();
      },
    });
  });

  describe('when calling toSignIn', () => {
    it('should instantiate SignInUseCase', () => {
      // Act
      packageTrackingDelegate.toSignIn();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(SignInUseCase);
    });
  });

  describe('when calling toSignUp', () => {
    it('should instantiate SingUpUseCase', () => {
      // Act
      packageTrackingDelegate.toSignUp();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(SingUpUseCase);
    });
  });

  describe('when calling toRegisterNewShipment', () => {
    it('should instantiate RegisterNewShipmentUseCase', () => {
      // Act
      packageTrackingDelegate.toRegisterNewShipment();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        RegisterNewShipmentUseCase,
      );
    });
  });

  describe('when calling toGetShipment', () => {
    it('should instantiate GetShipmentUseCase', () => {
      // Act
      packageTrackingDelegate.toGetShipment();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        GetShipmentUseCase,
      );
    });
  });

  describe('when calling toGetShipmentsByUser', () => {
    it('should instantiate GetShipmentsByUserUseCase', () => {
      // Act
      packageTrackingDelegate.toGetShipmentsByUser();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        GetShipmentsByUserUseCase,
      );
    });
  });

  describe('when calling toResetPassword', () => {
    it('should instantiate ResetPasswordUseCase', () => {
      // Act
      packageTrackingDelegate.toResetPassword();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        ResetPasswordUseCase,
      );
    });
  });

  describe('when calling toUpdateShipment', () => {
    it('should instantiate UpdateShipmentUseCase', () => {
      // Act
      packageTrackingDelegate.toUpdateShipment();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        UpdateShipmentUseCase,
      );
    });
  });

  describe('when calling toDeleteShipment', () => {
    it('should instantiate DeleteShipmentUseCase', () => {
      // Act
      packageTrackingDelegate.toDeleteShipment();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        DeleteShipmentUseCase,
      );
    });
  });

  describe('when calling toGetUser', () => {
    it('should instantiate GetUserUseCase', () => {
      // Act
      packageTrackingDelegate.toGetUser();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        GetUserUseCase,
      );
    });
  });

  describe('when calling toGetStatus', () => {
    it('should instantiate GetStatusUseCase', () => {
      // Act
      packageTrackingDelegate.toGetStatus();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        GetStatusUseCase,
      );
    });
  });

  describe('when calling toCreateUser', () => {
    it('should instantiate CreateUserUseCase', () => {
      // Act
      packageTrackingDelegate.toCreateUser();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        CreateUserUseCase,
      );
    });
  });

  describe('when calling toUpdateUser', () => {
    it('should instantiate UpdateUserUseCase', () => {
      // Act
      packageTrackingDelegate.toUpdateUser();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        UpdateUserUseCase,
      );
    });
  });

  describe('when calling toDeleteUser', () => {
    it('should instantiate DeleteUserUseCase', () => {
      // Act
      packageTrackingDelegate.toDeleteUser();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        DeleteUserUseCase,
      );
    });
  });

  describe('when calling toRegisterNewStatus', () => {
    it('should instantiate RegisterNewStatusUseCase', () => {
      // Act
      packageTrackingDelegate.toRegisterNewStatus();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        RegisterNewStatusUseCase,
      );
    });
  });

  describe('when calling toUpdateStatus', () => {
    it('should instantiate UpdateStatusUseCase', () => {
      // Act
      packageTrackingDelegate.toUpdateStatus();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        UpdateStatusUseCase,
      );
    });
  });

  describe('when calling toDeleteStatus', () => {
    it('should instantiate DeleteStatusUseCase', () => {
      // Act
      packageTrackingDelegate.toDeleteStatus();

      // Assert
      expect(packageTrackingDelegate['delegate']).toBeInstanceOf(
        DeleteStatusUseCase,
      );
    });
  });
});
