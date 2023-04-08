import { IStatusDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { StatusDomainEntity } from 'src/domain/entities';
import { Observable, switchMap } from 'rxjs';
import { IUpdateStatusDto } from 'src/domain/dto';

export class UpdateStatusUseCase implements IUseCase {
  constructor(private readonly status$: IStatusDomainService) {}

  execute(dto: IUpdateStatusDto): Observable<StatusDomainEntity> {
    return this.status$.getStatus(dto._id).pipe(
      switchMap((status: StatusDomainEntity) => {
        return this.status$.updateStatus(status._id, { ...status, ...dto });
      }),
    );
  }
}
