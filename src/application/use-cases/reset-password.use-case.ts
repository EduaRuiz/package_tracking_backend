import { Observable, of, switchMap, throwError } from 'rxjs';
import { IUseCase } from './interface';
import { IUserDomainService } from 'src/domain/services';
import { IResetPasswordDto } from 'src/domain/dto';
import { UserDomainEntity } from 'src/domain/entities';
import { NotFoundException } from '@nestjs/common';

export class ResetPasswordUseCase implements IUseCase {
  constructor(private readonly user$: IUserDomainService) {}

  execute(dto: IResetPasswordDto, userId: string): Observable<boolean> {
    (dto.userId && dto.userId !== userId) ??
      throwError(new NotFoundException('User not found'));
    return this.user$.getUserById(userId).pipe(
      switchMap((user: UserDomainEntity) => {
        return user._id !== userId
          ? throwError(new NotFoundException('User not found'))
          : this.user$
              .resetPassword(userId, dto.oldPassword, dto.newPassword)
              .pipe(switchMap(() => of(true)));
      }),
    );
  }
}
