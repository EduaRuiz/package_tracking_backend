import { ShipmentDomainEntity } from 'src/domain/entities';
import { IUseCase } from '../interface';
import { Observable, switchMap, throwError } from 'rxjs';
import { IShipmentDomainService } from 'src/domain/services';
import { ConflictException } from '@nestjs/common';

/**
 * Delete shipment use case
 *
 * @export
 * @class DeleteShipmentUseCase
 * @typedef {DeleteShipmentUseCase}
 * @implements {IUseCase}
 */
export class DeleteShipmentUseCase implements IUseCase {
  /**
   * Creates an instance of DeleteShipmentUseCase.
   *
   * @constructor
   * @param {IShipmentDomainService} shipment$ Shipment domain service
   */
  constructor(private readonly shipment$: IShipmentDomainService) {}

  /**
   * Delete shipment by id if its status is FINALIZED and belongs to the user id provided as argument to the method execute
   *
   * @param {string} shipmentId Shipment id
   * @param {string} userId User id
   * @returns {Observable<ShipmentDomainEntity>} Shipment domain entity deleted
   */
  execute(
    shipmentId: string,
    userId: string,
  ): Observable<ShipmentDomainEntity> {
    return this.shipment$.getShipmentById(shipmentId).pipe(
      switchMap((shipment) => {
        return shipment.status.name === 'FINALIZED' &&
          shipment.user._id.toString() === userId
          ? this.shipment$.deleteShipment(shipmentId)
          : throwError(
              () =>
                new ConflictException(
                  'Cannot delete shipment because its status is not FINALIZED',
                ),
            );
      }),
    );
  }
}
