import { UserDomainEntity } from 'src/domain/entities';
import { IAuthDomainService, IUserDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { Observable, switchMap } from 'rxjs';
import { ISignInDto } from 'src/domain/dto';
import { IUserResponse } from 'src/domain/interfaces';

/**
 * Sign in use case class definition for sign in user
 *
 * @export
 * @class SignInUseCase
 * @typedef {SignInUseCase}
 * @implements {IUseCase}
 */
export class SignInUseCase implements IUseCase {
  /**
   * Creates an instance of SignInUseCase.
   *
   * @constructor
   * @param {IUserDomainService} user$ User domain service
   * @param {IAuthDomainService} auth$ Auth domain service
   */
  constructor(
    private readonly user$: IUserDomainService,
    private readonly auth$: IAuthDomainService,
  ) {}

  /**
   * Sign in user by dto
   *
   * @param {ISignInDto} dto Sign in dto
   * @returns {Observable<IUserResponse>} User response observable
   */
  execute(dto: ISignInDto): Observable<IUserResponse> {
    return this.user$
      .signIn(dto.email, dto.firebaseId)
      .pipe(
        switchMap((user: UserDomainEntity) =>
          this.auth$.generateAuthResponse(user),
        ),
      );
  }
}
