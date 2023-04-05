import { IShipmentDomainService } from 'src/domain/services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, of, switchMap, throwError } from 'rxjs';
import {
  ShipmentMongoRepository,
  StatusMongoRepository,
} from '../repositories';
import { StatusMongoModel, ShipmentMongoModel } from '../models';

@Injectable()
export class ShipmentMongoService implements IShipmentDomainService {
  constructor(
    private readonly shipmentRepository: ShipmentMongoRepository,
    private readonly statusRepository: StatusMongoRepository,
  ) {}

  createShipment(entity: ShipmentMongoModel): Observable<ShipmentMongoModel> {
    return this.statusRepository.findAll().pipe(
      switchMap((status: StatusMongoModel[]) => {
        return of(
          status.find((status: StatusMongoModel) => status.name === 'CREATED'),
        ).pipe(
          switchMap((status: StatusMongoModel) => {
            return !status
              ? throwError(new NotFoundException('Status not found'))
              : this.shipmentRepository.create({ ...entity, status: status });
          }),
        );
      }),
    );
  }

  getShipmentById(id: string): Observable<ShipmentMongoModel> {
    return this.shipmentRepository.findOneById(id);
  }

  getAllShipments(): Observable<ShipmentMongoModel[]> {
    return this.shipmentRepository.findAll();
  }

  updateShipment(
    entityId: string,
    entity: ShipmentMongoModel,
  ): Observable<ShipmentMongoModel> {
    return this.shipmentRepository.update(entityId, entity);
  }
}
