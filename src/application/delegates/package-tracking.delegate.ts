import { IUseCase } from '../use-cases/interface';
import {
  IAuthDomainService,
  IShipmentDomainService,
  IUserDomainService,
} from '../../domain/services';
import { Observable } from 'rxjs';
import {
  GetShipmentUseCase,
  GetShipmentsByUserUseCase,
  RegisterNewShipmentUseCase,
  ResetPasswordUseCase,
  SignInUseCase,
  SingUpUseCase,
} from '../use-cases';

export class PackageTrackingDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly user$: IUserDomainService,
    private readonly shipment$: IShipmentDomainService,
    private readonly auth$: IAuthDomainService,
  ) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toSignIn(): void {
    this.delegate = new SignInUseCase(this.user$, this.auth$);
  }

  toSignUp(): void {
    this.delegate = new SingUpUseCase(this.user$, this.auth$);
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

  toResetPassword(): void {
    this.delegate = new ResetPasswordUseCase(this.user$);
  }
}
