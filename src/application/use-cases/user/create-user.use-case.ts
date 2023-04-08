import { IUserDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { Observable } from 'rxjs';
import { UserDomainEntity } from 'src/domain/entities';
import { ISignUpDto } from 'src/domain/dto';

export class CreateUserUseCase implements IUseCase {
  constructor(private readonly user$: IUserDomainService) {}

  execute(dto: ISignUpDto): Observable<UserDomainEntity> {
    return this.user$.signUp(dto);
  }
}
