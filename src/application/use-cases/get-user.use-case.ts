import { IUserDomainService } from 'src/domain/services';
import { IUseCase } from './interface';
import { UserDomainEntity } from 'src/domain/entities';
import { Observable } from 'rxjs';

export class GetUserUseCase implements IUseCase {
  constructor(private readonly user$: IUserDomainService) {}

  execute(userId: string): Observable<UserDomainEntity> {
    return this.user$.getUserById(userId);
  }
}
