import {
  IShipmentDomainService,
  IStatusDomainService,
} from 'src/domain/services';
import { IUseCase } from '../interface';
import { StatusDomainEntity } from 'src/domain/entities';
import { Observable, switchMap, throwError } from 'rxjs';
import { ConflictException } from '@nestjs/common';

/**
 * Delete status use case (business rule: cannot delete status if it is in use)
 *
 * @export
 * @class DeleteStatusUseCase
 * @typedef {DeleteStatusUseCase}
 * @implements {IUseCase}
 */
export class DeleteStatusUseCase implements IUseCase {
  /**
   * Creates an instance of DeleteStatusUseCase.
   *
   * @constructor
   * @param {IStatusDomainService} status$ Status domain service
   * @param {IShipmentDomainService} shipment$ Shipment domain service
   */
  constructor(
    private readonly status$: IStatusDomainService,
    private readonly shipment$: IShipmentDomainService,
  ) {}

  /**
   * Delete status by id if it is not in use by any shipment
   *
   * @param {string} statusId Status id
   * @returns {Observable<StatusDomainEntity>} Status domain entity deleted
   */
  execute(statusId: string): Observable<StatusDomainEntity> {
    return this.shipment$.getAllShipments().pipe(
      switchMap((shipments) => {
        const shipment = shipments.find(
          (shipment) => shipment.status._id.toString() === statusId,
        );
        return !shipment
          ? this.status$.deleteStatus(statusId)
          : throwError(
              () =>
                new ConflictException(
                  'Cannot delete status because it is in use',
                ),
            );
      }),
    );
  }
}
