import {
  IAuthDomainService,
  IShipmentDomainService,
  IUserDomainService,
} from 'src/domain/services';
import { PackageTrackingDelegate } from '..';
import { Observable, of } from 'rxjs';

let packageTrackingDelegate: PackageTrackingDelegate;
let userDomainService: IUserDomainService;
let shipmentDomainService: IShipmentDomainService;
let authDomainService: IAuthDomainService;

describe('PackageTrackingDelegate', () => {
  beforeEach(() => {
    // Arrange
    userDomainService = {
      signIn: jest.fn(),
      signUp: jest.fn(),
      resetPassword: jest.fn(),
      getUserById: jest.fn(),
      getAllUsers: jest.fn(),
    };
    shipmentDomainService = {
      createShipment: jest.fn(),
      getShipmentById: jest.fn(),
      getAllShipments: jest.fn(),
      updateShipment: jest.fn(),
    };
    authDomainService = {
      generateAuthResponse: jest.fn(),
    };

    // Act
    packageTrackingDelegate = new PackageTrackingDelegate(
      userDomainService,
      shipmentDomainService,
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
});
