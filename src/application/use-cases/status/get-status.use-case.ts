import { IStatusDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { StatusDomainEntity } from 'src/domain/entities';
import { Observable } from 'rxjs';

/**
 * Get status use case
 *
 * @export
 * @class GetStatusUseCase
 * @typedef {GetStatusUseCase}
 * @implements {IUseCase}
 */
export class GetStatusUseCase implements IUseCase {
  /**
   * Creates an instance of GetStatusUseCase.
   *
   * @constructor
   * @param {IStatusDomainService} status$ Status domain service
   */
  constructor(private readonly status$: IStatusDomainService) {}

  /**
   * Get status by id
   *
   * @param {string} statusId Status id
   * @returns {Observable<StatusDomainEntity>} Status domain entity observable
   */
  execute(statusId: string): Observable<StatusDomainEntity> {
    return this.status$.getStatus(statusId);
  }
}
