import { IStatusDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { StatusDomainEntity } from 'src/domain/entities';
import { Observable } from 'rxjs';
import { INewStatusDto } from 'src/domain/dto/new-status.dto.interface';

/**
 * Register new status use case
 *
 * @export
 * @class RegisterNewStatusUseCase
 * @typedef {RegisterNewStatusUseCase}
 * @implements {IUseCase}
 */
export class RegisterNewStatusUseCase implements IUseCase {
  /**
   * Creates an instance of RegisterNewStatusUseCase.
   *
   * @constructor
   * @param {IStatusDomainService} status$ Status domain service
   */
  constructor(private readonly status$: IStatusDomainService) {}

  /**
   * Register new status by dto
   *
   * @param {INewStatusDto} dto New status dto
   * @returns {Observable<StatusDomainEntity>} Status domain entity observable
   */
  execute(dto: INewStatusDto): Observable<StatusDomainEntity> {
    return this.status$.createStatus(dto);
  }
}
