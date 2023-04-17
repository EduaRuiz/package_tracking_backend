import { IShipmentDomainService } from 'src/domain/services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, of, switchMap, throwError } from 'rxjs';
import {
  ShipmentMongoRepository,
  StatusMongoRepository,
} from '../repositories';
import { StatusMongoModel, ShipmentMongoModel } from '../models';
import { ShipmentDomainEntity } from 'src/domain/entities';

/**
 * Shipment Mongo Service class
 *
 * @export
 * @class ShipmentMongoService
 * @typedef {ShipmentMongoService}
 * @implements {IShipmentDomainService}
 */
@Injectable()
export class ShipmentMongoService implements IShipmentDomainService {
  /**
   * Creates an instance of ShipmentMongoService.
   *
   * @constructor
   * @param {ShipmentMongoRepository} shipmentRepository The shipment Mongo repository
   * @param {StatusMongoRepository} statusRepository The status Mongo repository
   */
  constructor(
    private readonly shipmentRepository: ShipmentMongoRepository,
    private readonly statusRepository: StatusMongoRepository,
  ) {}

  /**
   * Deletes a shipment
   *
   * @param {string} entityId The shipment id to delete
   * @returns {Observable<ShipmentDomainEntity>} The shipment deleted
   */
  deleteShipment(entityId: string): Observable<ShipmentDomainEntity> {
    return this.shipmentRepository.delete(entityId);
  }

  /**
   * Creates a shipment
   *
   * @param {ShipmentMongoModel} entity The shipment to create
   * @returns {Observable<ShipmentMongoModel>} The shipment created
   */
  createShipment(entity: ShipmentMongoModel): Observable<ShipmentMongoModel> {
    return this.statusRepository.findAll().pipe(
      switchMap((status: StatusMongoModel[]) => {
        return of(
          status.find((status: StatusMongoModel) => status.name === 'CREATED'),
        ).pipe(
          switchMap((status: StatusMongoModel) => {
            return !status
              ? throwError(() => new NotFoundException('Status not found'))
              : this.shipmentRepository.create({ ...entity, status: status });
          }),
        );
      }),
    );
  }

  /**
   * Gets a shipment by id
   *
   * @param {string} id The shipment id to get
   * @returns {Observable<ShipmentMongoModel>} The shipment found
   */
  getShipmentById(id: string): Observable<ShipmentMongoModel> {
    return this.shipmentRepository.findOneById(id);
  }

  /**
   * Gets all shipments
   *
   * @returns {Observable<ShipmentMongoModel[]>} The shipments found
   */
  getAllShipments(): Observable<ShipmentMongoModel[]> {
    return this.shipmentRepository.findAll();
  }

  /**
   * Updates a shipment
   *
   * @param {string} entityId The shipment id to update
   * @param {ShipmentMongoModel} entity The shipment to update
   * @returns {Observable<ShipmentMongoModel>} The shipment updated
   */
  updateShipment(
    entityId: string,
    entity: ShipmentMongoModel,
  ): Observable<ShipmentMongoModel> {
    return this.shipmentRepository.update(entityId, entity);
  }
}
