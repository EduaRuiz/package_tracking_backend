import { IShipmentDomainService } from 'src/domain/services';
import { IUseCase } from '../interface';
import { ShipmentDomainEntity } from 'src/domain/entities';
import { Observable, of, switchMap } from 'rxjs';

/**
 * Get shipments by user use case
 *
 * @export
 * @class GetShipmentsByUserUseCase
 * @typedef {GetShipmentsByUserUseCase}
 * @implements {IUseCase}
 */
export class GetShipmentsByUserUseCase implements IUseCase {
  /**
   * Creates an instance of GetShipmentsByUserUseCase.
   *
   * @constructor
   * @param {IShipmentDomainService} shipment$ Shipment domain service
   */
  constructor(private readonly shipment$: IShipmentDomainService) {}

  /**
   * Get all shipments by user id
   *
   * @param {string} userId User id
   * @returns {Observable<ShipmentDomainEntity[]>} Shipment domain entity
   */
  execute(userId: string): Observable<ShipmentDomainEntity[]> {
    return this.shipment$
      .getAllShipments()
      .pipe(
        switchMap((shipments: ShipmentDomainEntity[]) =>
          of(this.filterByUser(shipments, userId)),
        ),
      );
  }

  /**
   * Description placeholder
   *
   * @private
   * @param {ShipmentDomainEntity[]} shipments Shipment domain entity
   * @param {string} userId User id
   * @returns {ShipmentDomainEntity[]} Shipment domain entity
   */
  private filterByUser(
    shipments: ShipmentDomainEntity[],
    userId: string,
  ): ShipmentDomainEntity[] {
    return shipments.filter(
      (shipment: ShipmentDomainEntity) =>
        shipment.user._id.toString() === userId,
    );
  }
}
