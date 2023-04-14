import {
  IShipmentDomainService,
  IStatusDomainService,
} from 'src/domain/services';
import { IUseCase } from '../interface';
import { ShipmentDomainEntity } from 'src/domain/entities';
import { Observable, switchMap } from 'rxjs';
import { IUpdateShipmentDto } from 'src/domain/dto';

export class UpdateShipmentUseCase implements IUseCase {
  constructor(
    private readonly shipment$: IShipmentDomainService,
    private readonly status$: IStatusDomainService,
  ) {}

  execute(
    shipmentId: string,
    dto: IUpdateShipmentDto,
  ): Observable<ShipmentDomainEntity> {
    return dto.statusId
      ? this.status$.getStatus(dto.statusId).pipe(
          switchMap((status) => {
            return this.shipment$.getShipmentById(shipmentId).pipe(
              switchMap((shipment) => {
                shipment.destinationAddress =
                  dto.destinationAddress || shipment.destinationAddress;
                shipment.originAddress =
                  dto.originAddress || shipment.originAddress;
                shipment.status = status;
                shipment.updatedAt = new Date();
                return this.shipment$.updateShipment(shipmentId, {
                  ...shipment,
                  ...dto,
                  status,
                  _id: shipment._id,
                });
              }),
            );
          }),
        )
      : this.shipment$.getShipmentById(shipmentId).pipe(
          switchMap((shipment) => {
            shipment.destinationAddress =
              dto.destinationAddress || shipment.destinationAddress;
            shipment.originAddress =
              dto.originAddress || shipment.originAddress;
            shipment.updatedAt = new Date();
            return this.shipment$.updateShipment(shipmentId, {
              ...shipment,
              ...dto,
              updatedAt: new Date(),
              _id: shipment._id,
            });
          }),
        );
  }
}
