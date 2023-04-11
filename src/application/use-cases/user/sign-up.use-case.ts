import { IAuthDomainService, IUserDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { ISignUpDto } from 'src/domain/dto';
import { UserDomainEntity } from 'src/domain/entities';
import { IUserResponse } from 'src/domain/interfaces';
import { ConflictException } from '@nestjs/common';

export class SignUpUseCase implements IUseCase {
  constructor(
    private readonly user$: IUserDomainService,
    private readonly auth$: IAuthDomainService,
  ) {}

  execute(dto: ISignUpDto): Observable<IUserResponse> {
    return this.validateUserDataExist(dto).pipe(
      switchMap(() =>
        this.user$
          .signUp(dto)
          .pipe(
            switchMap((user: UserDomainEntity) =>
              this.auth$.generateAuthResponse(user),
            ),
          ),
      ),
    );
  }

  private validateUserDataExist(dto: ISignUpDto): Observable<boolean> {
    return this.user$.getAllUsers().pipe(
      switchMap((users: UserDomainEntity[]) => {
        const user = users.filter((user: UserDomainEntity) => {
          return (
            dto.email.toString() === user.email.toString() ||
            dto.document.toString() === user.document.toString() ||
            dto.firebaseId === user.firebaseId
          );
        })[0];
        return !user
          ? of(false)
          : user.email === dto.email
          ? throwError(() => new ConflictException('Email already exist'))
          : dto.firebaseId === user.firebaseId
          ? throwError(() => new ConflictException('FirebaseId already exist'))
          : throwError(() => new ConflictException('Document already exist'));
      }),
    );
  }
}
