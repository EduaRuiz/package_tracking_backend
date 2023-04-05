import { Observable, catchError, from, of, switchMap, throwError } from 'rxjs';
import { ShipmentPostgresEntity } from '../entities';
import { IRepositoryBase } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export class ShipmentPostgresRepository
  implements IRepositoryBase<ShipmentPostgresEntity>
{
  constructor(
    @InjectRepository(ShipmentPostgresEntity)
    private shipmentPostgresEntity: Repository<ShipmentPostgresEntity>,
  ) {}

  create(entity: ShipmentPostgresEntity): Observable<ShipmentPostgresEntity> {
    entity.id = uuid();
    return from(this.shipmentPostgresEntity.save(entity)).pipe(
      catchError((error: QueryFailedError) => {
        error.message = 'Error while creating shipment';
        throw error;
      }),
    );
  }

  update(
    entityId: string,
    entity: ShipmentPostgresEntity,
  ): Observable<ShipmentPostgresEntity> {
    return from(
      this.findOneById(entityId).pipe(
        switchMap((shipment: ShipmentPostgresEntity) => {
          return from(
            this.shipmentPostgresEntity.save({
              ...shipment,
              ...entity,
              id: shipment.id,
            }),
          ).pipe(
            catchError((error: QueryFailedError) => {
              error.message = 'Error while updating shipment';
              throw error;
            }),
          );
        }),
      ),
    );
  }

  delete(entityId: string): Observable<ShipmentPostgresEntity> {
    return from(
      this.findOneById(entityId).pipe(
        switchMap((shipment: ShipmentPostgresEntity) => {
          return from(this.shipmentPostgresEntity.remove(shipment)).pipe(
            catchError((error: QueryFailedError) => {
              error.message = 'Error while deleting shipment';
              throw error;
            }),
          );
        }),
      ),
    );
  }

  findAll(): Observable<ShipmentPostgresEntity[]> {
    return from(
      this.shipmentPostgresEntity.find({ relations: ['user', 'status'] }),
    ).pipe(
      catchError((error: QueryFailedError) => {
        error.message = 'Error while getting shipments';
        throw error;
      }),
    );
  }

  findOneById(entityId: string): Observable<ShipmentPostgresEntity> {
    return from(
      this.shipmentPostgresEntity.findOne({
        where: { id: entityId },
        relations: ['user', 'status'],
      }),
    ).pipe(
      catchError((error: QueryFailedError) => {
        error.message = 'Error while getting shipment by id';
        throw error;
      }),
      switchMap((shipment: ShipmentPostgresEntity | undefined | null) =>
        shipment
          ? of(shipment)
          : throwError(new NotFoundException('Shipment not found')),
      ),
    );
  }
}
