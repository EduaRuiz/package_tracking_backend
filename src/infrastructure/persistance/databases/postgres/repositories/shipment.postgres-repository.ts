import {
  Observable,
  catchError,
  from,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { ShipmentPostgresEntity } from '../entities';
import { IRepositoryBase } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

export class ShipmentPostgresRepository
  implements IRepositoryBase<ShipmentPostgresEntity>
{
  constructor(
    @InjectRepository(ShipmentPostgresEntity)
    private shipmentPostgresEntity: Repository<ShipmentPostgresEntity>,
  ) {}

  create(entity: ShipmentPostgresEntity): Observable<ShipmentPostgresEntity> {
    return from(this.shipmentPostgresEntity.save(entity)).pipe(
      catchError((error: Error) => {
        throw new ConflictException(
          'Error while creating shipment',
          error.message,
        );
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
            catchError((error: Error) => {
              throw new ConflictException(
                'Error while updating shipment',
                error.message,
              );
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
            catchError((error: Error) => {
              throw new ConflictException(
                'Error while deleting shipment',
                error.message,
              );
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
      catchError((error: Error) => {
        throw new ConflictException(
          'Error while getting shipments',
          error.message,
        );
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
      catchError((error: Error) => {
        throw new ConflictException(
          'Error while getting shipment by id',
          error.message,
        );
      }),
      switchMap((shipment: ShipmentPostgresEntity | undefined | null) =>
        shipment
          ? of(shipment)
          : throwError(new NotFoundException('Shipment not found')),
      ),
    );
  }
}
