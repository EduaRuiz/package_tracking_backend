import { IStatusDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { StatusDomainEntity } from 'src/domain/entities';
import { Observable, switchMap } from 'rxjs';
import { IUpdateStatusDto } from 'src/domain/dto';

/**
 * Update status use case
 *
 * @export
 * @class UpdateStatusUseCase
 * @typedef {UpdateStatusUseCase}
 * @implements {IUseCase}
 */
export class UpdateStatusUseCase implements IUseCase {
  /**
   * Creates an instance of UpdateStatusUseCase.
   *
   * @constructor
   * @param {IStatusDomainService} status$ Status domain service
   */
  constructor(private readonly status$: IStatusDomainService) {}

  /**
   * Update status by dto and id of status
   *
   * @param {IUpdateStatusDto} dto Update status dto
   * @returns {Observable<StatusDomainEntity>} Status domain entity observable
   */
  execute(dto: IUpdateStatusDto): Observable<StatusDomainEntity> {
    return this.status$.getStatus(dto._id).pipe(
      switchMap((status: StatusDomainEntity) => {
        status.description = dto.description || status.description;
        return this.status$.updateStatus(status._id, {
          ...status,
          ...dto,
          _id: status._id,
        });
      }),
    );
  }
}
