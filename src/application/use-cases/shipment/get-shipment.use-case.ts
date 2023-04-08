import { IShipmentDomainService } from 'src/domain/services/shipment.domain-service.interface';
import { IUseCase } from '../interface';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { ShipmentDomainEntity } from 'src/domain/entities';
import { NotFoundException } from '@nestjs/common';

export class GetShipmentUseCase implements IUseCase {
  constructor(private readonly shipment$: IShipmentDomainService) {}

  execute(
    shipmentId: string,
    userId: string,
  ): Observable<ShipmentDomainEntity> {
    return this.shipment$
      .getShipmentById(shipmentId)
      .pipe(switchMap(this.verifyUserIdMatch(userId)));
  }

  private verifyUserIdMatch(
    userId: string,
  ): (shipment: ShipmentDomainEntity) => Observable<ShipmentDomainEntity> {
    return (shipment: ShipmentDomainEntity) => {
      return shipment.user._id.toString() !== userId
        ? throwError(new NotFoundException('Shipment not found'))
        : of(shipment);
    };
  }
}
