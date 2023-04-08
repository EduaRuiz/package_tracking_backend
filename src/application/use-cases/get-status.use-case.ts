import { IStatusDomainService } from 'src/domain/services';
import { IUseCase } from './interface';
import { StatusDomainEntity } from 'src/domain/entities';
import { Observable } from 'rxjs';

export class GetStatusUseCase implements IUseCase {
  constructor(private readonly status$: IStatusDomainService) {}

  execute(statusId: string): Observable<StatusDomainEntity> {
    return this.status$.getStatus(statusId);
  }
}
