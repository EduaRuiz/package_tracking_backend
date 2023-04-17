import { IShipmentDomainService } from 'src/domain/services/shipment.domain-service.interface';
import { IUseCase } from '../interface';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { ShipmentDomainEntity } from 'src/domain/entities';
import { NotFoundException } from '@nestjs/common';

/**
 * Get shipment use case
 *
 * @export
 * @class GetShipmentUseCase
 * @typedef {GetShipmentUseCase}
 * @implements {IUseCase}
 */
export class GetShipmentUseCase implements IUseCase {
  /**
   * Creates an instance of GetShipmentUseCase.
   *
   * @constructor
   * @param {IShipmentDomainService} shipment$ Shipment domain service
   */
  constructor(private readonly shipment$: IShipmentDomainService) {}

  /**
   * Get shipment by id if it belongs to the user id provided as argument to the method execute
   *
   * @param {string} shipmentId Shipment id
   * @param {string} userId User id
   * @returns {Observable<ShipmentDomainEntity>} Shipment domain entity
   */
  execute(
    shipmentId: string,
    userId: string,
  ): Observable<ShipmentDomainEntity> {
    return this.shipment$
      .getShipmentById(shipmentId)
      .pipe(switchMap(this.verifyUserIdMatch(userId)));
  }

  /**
   * Verify if the shipment belongs to the user id provided as argument to the method execute
   *
   * @private
   * @param {string} userId User id
   * @returns {(shipment: ShipmentDomainEntity) => Observable<ShipmentDomainEntity>} Shipment domain entity
   */
  private verifyUserIdMatch(
    userId: string,
  ): (shipment: ShipmentDomainEntity) => Observable<ShipmentDomainEntity> {
    return (shipment: ShipmentDomainEntity) => {
      return shipment.user._id.toString() !== userId
        ? throwError(() => new NotFoundException('Shipment not found'))
        : of(shipment);
    };
  }
}
