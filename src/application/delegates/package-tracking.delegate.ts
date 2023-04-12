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

export class PackageTrackingDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly user$: IUserDomainService,
    private readonly shipment$: IShipmentDomainService,
    private readonly status$: IStatusDomainService,
    private readonly auth$: IAuthDomainService,
  ) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toSignIn(): void {
    this.delegate = new SignInUseCase(this.user$, this.auth$);
  }

  toSignUp(): void {
    this.delegate = new SignUpUseCase(this.user$, this.auth$);
  }

  toRegisterNewShipment(): void {
    this.delegate = new RegisterNewShipmentUseCase(this.shipment$, this.user$);
  }

  toGetShipment(): void {
    this.delegate = new GetShipmentUseCase(this.shipment$);
  }

  toGetShipmentsByUser(): void {
    this.delegate = new GetShipmentsByUserUseCase(this.shipment$);
  }

  toUpdateShipment(): void {
    this.delegate = new UpdateShipmentUseCase(this.shipment$, this.status$);
  }

  toDeleteShipment(): void {
    this.delegate = new DeleteShipmentUseCase(this.shipment$);
  }

  toGetUser(): void {
    this.delegate = new GetUserUseCase(this.user$);
  }

  toGetStatus(): void {
    this.delegate = new GetStatusUseCase(this.status$);
  }

  toCreateUser(): void {
    this.delegate = new CreateUserUseCase(this.user$);
  }

  toUpdateUser(): void {
    this.delegate = new UpdateUserUseCase(this.user$);
  }

  toDeleteUser(): void {
    this.delegate = new DeleteUserUseCase(this.user$, this.shipment$);
  }

  toRegisterNewStatus(): void {
    this.delegate = new RegisterNewStatusUseCase(this.status$);
  }

  toUpdateStatus(): void {
    this.delegate = new UpdateStatusUseCase(this.status$);
  }

  toDeleteStatus(): void {
    this.delegate = new DeleteStatusUseCase(this.status$, this.shipment$);
  }

  toRefreshToken(): void {
    this.delegate = new RefreshTokenUseCase(this.user$, this.auth$);
  }
}
