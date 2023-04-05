import { IShipmentDomainService } from 'src/domain/services';
import { IUseCase } from './interface';
import { ShipmentDomainEntity } from 'src/domain/entities';
import { Observable, of, switchMap } from 'rxjs';

export class GetShipmentsByUserUseCase implements IUseCase {
  constructor(private readonly shipmentDomain$: IShipmentDomainService) {}

  execute(userId: string): Observable<ShipmentDomainEntity[]> {
    return this.shipmentDomain$
      .getAllShipments()
      .pipe(
        switchMap((shipments: ShipmentDomainEntity[]) =>
          of(this.filterByUser(shipments, userId)),
        ),
      );
  }

  private filterByUser(
    shipments: ShipmentDomainEntity[],
    userId: string,
  ): ShipmentDomainEntity[] {
    return shipments.filter(
      (shipment: ShipmentDomainEntity) => shipment.user._id === userId,
    );
  }
}
