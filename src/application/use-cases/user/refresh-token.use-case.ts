import { Observable, of, switchMap, throwError } from 'rxjs';
import { IUseCase } from '..';
import { IAuthDomainService, IUserDomainService } from '@domain/services';
import { IUserDomainEntity } from '@domain/entities/interfaces';
import { IUserResponse } from '@domain/interfaces';

export class RefreshTokenUseCase implements IUseCase {
  constructor(
    private readonly user$: IUserDomainService,
    private readonly auth$: IAuthDomainService,
  ) {}

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
