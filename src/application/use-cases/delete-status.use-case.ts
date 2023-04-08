import {
  IShipmentDomainService,
  IStatusDomainService,
} from 'src/domain/services';
import { IUseCase } from './interface';
import { StatusDomainEntity } from 'src/domain/entities';
import { Observable, switchMap, throwError } from 'rxjs';

export class DeleteStatusUseCase implements IUseCase {
  constructor(
    private readonly status$: IStatusDomainService,
    private readonly shipment$: IShipmentDomainService,
  ) {}

  execute(statusId: string): Observable<StatusDomainEntity> {
    return this.shipment$.getAllShipments().pipe(
      switchMap((shipments) => {
        const shipment = shipments.find(
          (shipment) => shipment.status._id.toString() === statusId,
        );
        return !shipment
          ? this.status$.deleteStatus(statusId)
          : throwError(new Error('Cannot delete status because it is in use'));
      }),
    );
  }
}
