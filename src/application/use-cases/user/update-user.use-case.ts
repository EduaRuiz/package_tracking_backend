import { IUserDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { UserDomainEntity } from 'src/domain/entities';
import { Observable, switchMap } from 'rxjs';
import { IUpdateUserDto } from 'src/domain/dto';

export class UpdateUserUseCase implements IUseCase {
  constructor(private readonly user$: IUserDomainService) {}

  execute(userId: string, dto: IUpdateUserDto): Observable<UserDomainEntity> {
    return this.user$.getUserById(userId).pipe(
      switchMap((user) => {
        return this.user$.updateUser(userId, {
          ...user,
          ...dto,
          _id: user._id,
        });
      }),
    );
  }
}
