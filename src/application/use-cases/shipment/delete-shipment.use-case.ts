import { ShipmentDomainEntity } from 'src/domain/entities';
import { IUseCase } from '../interface';
import { Observable, switchMap, throwError } from 'rxjs';
import { IShipmentDomainService } from 'src/domain/services';

export class DeleteShipmentUseCase implements IUseCase {
  constructor(private readonly shipment$: IShipmentDomainService) {}

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
                new Error(
                  'Cannot delete shipment because its status is not FINALIZED',
                ),
            );
      }),
    );
  }
}
