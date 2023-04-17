import { IUseCase } from '../use-cases/interface';
import {
  IAuthDomainService,
  IShipmentDomainService,
  IStatusDomainService,
  IUserDomainService,
} from '../../domain/services';
import { Observable } from 'rxjs';
import {
  // ShipmentUseCases
  DeleteShipmentUseCase,
  GetShipmentUseCase,
  GetShipmentsByUserUseCase,
  RegisterNewShipmentUseCase,
  CreateUserUseCase,
  UpdateShipmentUseCase,
  // StatusUseCases
  DeleteStatusUseCase,
  GetStatusUseCase,
  RegisterNewStatusUseCase,
  UpdateStatusUseCase,
  // UserUseCases
  DeleteUserUseCase,
  GetUserUseCase,
  SignInUseCase,
  SignUpUseCase,
  UpdateUserUseCase,
  RefreshTokenUseCase,
} from '../use-cases';

/**
 * Package tracking delegate
 *
 * @export
 * @class PackageTrackingDelegate
 * @typedef {PackageTrackingDelegate}
 * @implements {IUseCase}
 */
export class PackageTrackingDelegate implements IUseCase {
  /**
   * Delegate use case instance to execute use case methods and properties from the delegate instance
   *
   * @private
   * @type {IUseCase}
   */
  private delegate: IUseCase;

  /**
   * Creates an instance of PackageTrackingDelegate.
   *
   * @constructor
   * @param {IUserDomainService} user$ User domain service
   * @param {IShipmentDomainService} shipment$ Shipment domain service
   * @param {IStatusDomainService} status$ Status domain service
   * @param {IAuthDomainService} auth$ Auth domain service
   */
  constructor(
    private readonly user$: IUserDomainService,
    private readonly shipment$: IShipmentDomainService,
    private readonly status$: IStatusDomainService,
    private readonly auth$: IAuthDomainService,
  ) {}

  /**
   * Description placeholder
   *
   * @template Response
   * @param {...any[]} args Arguments
   * @returns {Observable<Response>} Response observable instance of type Response
   */
  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  /**
   * To sign in use case
   */
  toSignIn(): void {
    this.delegate = new SignInUseCase(this.user$, this.auth$);
  }

  /**
   * To sign up use case
   */
  toSignUp(): void {
    this.delegate = new SignUpUseCase(this.user$, this.auth$);
  }

  /**
   * To register new shipment use case
   */
  toRegisterNewShipment(): void {
    this.delegate = new RegisterNewShipmentUseCase(this.shipment$, this.user$);
  }

  /**
   * To get shipment use case
   */
  toGetShipment(): void {
    this.delegate = new GetShipmentUseCase(this.shipment$);
  }

  /**
   * To get shipments by user use case
   */
  toGetShipmentsByUser(): void {
    this.delegate = new GetShipmentsByUserUseCase(this.shipment$);
  }

  /**
   * To update shipment use case
   */
  toUpdateShipment(): void {
    this.delegate = new UpdateShipmentUseCase(this.shipment$, this.status$);
  }

  /**
   * To delete shipment use case
   */
  toDeleteShipment(): void {
    this.delegate = new DeleteShipmentUseCase(this.shipment$);
  }

  /**
   * To get user use case
   */
  toGetUser(): void {
    this.delegate = new GetUserUseCase(this.user$);
  }

  /**
   * To get status use case
   */
  toGetStatus(): void {
    this.delegate = new GetStatusUseCase(this.status$);
  }

  /**
   * To create user use case
   */
  toCreateUser(): void {
    this.delegate = new CreateUserUseCase(this.user$);
  }

  /**
   * To update user use case
   */
  toUpdateUser(): void {
    this.delegate = new UpdateUserUseCase(this.user$);
  }

  /**
   * To delete user use case
   */
  toDeleteUser(): void {
    this.delegate = new DeleteUserUseCase(this.user$, this.shipment$);
  }

  /**
   * To register new status use case
   */
  toRegisterNewStatus(): void {
    this.delegate = new RegisterNewStatusUseCase(this.status$);
  }

  /**
   * To update status use case
   */
  toUpdateStatus(): void {
    this.delegate = new UpdateStatusUseCase(this.status$);
  }

  /**
   * To delete status use case
   */
  toDeleteStatus(): void {
    this.delegate = new DeleteStatusUseCase(this.status$, this.shipment$);
  }

  /**
   * To refresh token use case
   */
  toRefreshToken(): void {
    this.delegate = new RefreshTokenUseCase(this.user$, this.auth$);
  }
}
