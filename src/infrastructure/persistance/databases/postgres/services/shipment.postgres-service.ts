import { IShipmentDomainService } from 'src/domain/services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { ShipmentPostgresEntity, StatusPostgresEntity } from '../entities';
import { ShipmentPostgresRepository } from '../repositories';
import { StatusPostgresRepository } from '../repositories/status.postgres-repository';

@Injectable()
export class ShipmentPostgresService implements IShipmentDomainService {
  constructor(
    private readonly shipmentRepository: ShipmentPostgresRepository,
    private readonly statusRepository: StatusPostgresRepository,
  ) {}

  createShipment(
    entity: ShipmentPostgresEntity,
  ): Observable<ShipmentPostgresEntity> {
    return this.statusRepository.findAll().pipe(
      switchMap((status: StatusPostgresEntity[]) => {
        return of(
          status.find(
            (status: StatusPostgresEntity) => status.name === 'CREATED',
          ),
        ).pipe(
          switchMap((status: StatusPostgresEntity) => {
            return !status
              ? throwError(new NotFoundException('Status not found'))
              : this.shipmentRepository.create({ ...entity, status: status });
          }),
        );
      }),
    );
  }

  getShipmentById(id: string): Observable<ShipmentPostgresEntity> {
    return this.shipmentRepository.findOneById(id);
  }

  getAllShipments(): Observable<ShipmentPostgresEntity[]> {
    return this.shipmentRepository.findAll();
  }

  updateShipment(
    entityId: string,
    entity: ShipmentPostgresEntity,
  ): Observable<ShipmentPostgresEntity> {
    return this.shipmentRepository.update(entityId, entity);
  }
}
