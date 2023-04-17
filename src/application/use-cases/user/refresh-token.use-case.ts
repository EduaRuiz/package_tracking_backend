import { Observable, of, switchMap, throwError } from 'rxjs';
import { IUseCase } from '..';
import { IAuthDomainService, IUserDomainService } from '@domain/services';
import { IUserDomainEntity } from '@domain/entities/interfaces';
import { IUserResponse } from '@domain/interfaces';

/**
 * Refresh token use case
 *
 * @export
 * @class RefreshTokenUseCase
 * @typedef {RefreshTokenUseCase}
 * @implements {IUseCase}
 */
export class RefreshTokenUseCase implements IUseCase {
  /**
   * Creates an instance of RefreshTokenUseCase.
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
   * Refresh token by user id
   *
   * @param {string} userId User id
   * @returns {Observable<IUserResponse>} User response observable
   */
  execute(userId: string): Observable<IUserResponse> {
    return this.user$
      .getUserById(userId)
      .pipe(
        switchMap((user: IUserDomainEntity) =>
          this.auth$.generateAuthResponse(user),
        ),
      );
  }
}
