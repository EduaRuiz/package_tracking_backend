import { IAuthDomainService, IUserDomainService } from 'src/domain/services';
import { IUseCase } from './interface';
import { Observable, switchMap } from 'rxjs';
import { ISignUpDto } from 'src/domain/dto';
import { UserDomainEntity } from 'src/domain/entities';
import { IUserResponse } from 'src/domain/interfaces';

export class SingUpUseCase implements IUseCase {
  constructor(
    private readonly user$: IUserDomainService,
    private readonly auth$: IAuthDomainService,
  ) {}

  execute(dto: ISignUpDto): Observable<IUserResponse> {
    return this.user$
      .signUp(dto)
      .pipe(
        switchMap((user: UserDomainEntity) =>
          this.auth$.generateAuthResponse(user),
        ),
      );
  }
}
