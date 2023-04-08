import { IStatusDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { StatusDomainEntity } from 'src/domain/entities';
import { Observable } from 'rxjs';
import { INewStatusDto } from 'src/domain/dto/new-status.dto.interface';

export class RegisterNewStatusUseCase implements IUseCase {
  constructor(private readonly status$: IStatusDomainService) {}

  execute(dto: INewStatusDto): Observable<StatusDomainEntity> {
    return this.status$.createStatus(dto);
  }
}
