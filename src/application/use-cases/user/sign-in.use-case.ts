import { UserDomainEntity } from 'src/domain/entities';
import { IAuthDomainService, IUserDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { Observable, switchMap } from 'rxjs';
import { ISignInDto } from 'src/domain/dto';
import { IUserResponse } from 'src/domain/interfaces';

export class SignInUseCase implements IUseCase {
  constructor(
    private readonly user$: IUserDomainService,
    private readonly auth$: IAuthDomainService,
  ) {}

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
