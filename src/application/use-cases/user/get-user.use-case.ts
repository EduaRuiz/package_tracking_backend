import { IUserDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { UserDomainEntity } from 'src/domain/entities';
import { Observable, map, throwError } from 'rxjs';
import { BadRequestException } from '@nestjs/common';

export class GetUserUseCase implements IUseCase {
  constructor(private readonly user$: IUserDomainService) {}

  execute(userId: string, currentUserId: string): Observable<UserDomainEntity> {
    return userId === currentUserId
      ? this.user$.getUserById(userId).pipe(
          map((user: UserDomainEntity) => {
            user.firebaseId = undefined;
            return user;
          }),
        )
      : throwError(() => new BadRequestException('Cannot get other user'));
  }
}
