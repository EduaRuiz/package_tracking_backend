import { IShipmentDomainService } from 'src/domain/services';
import { IUseCase } from './interface';
import { ShipmentDomainEntity } from 'src/domain/entities';
import { Observable, of, switchMap } from 'rxjs';

export class GetShipmentsByUserUseCase implements IUseCase {
  constructor(private readonly shipmentDomain$: IShipmentDomainService) {}

  execute(userId: string): Observable<ShipmentDomainEntity[]> {
    console.log(userId);
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
    console.log(shipments);
    return shipments.filter(
      (shipment: ShipmentDomainEntity) => shipment.user.id === userId,
    );
  }
}
