import {
  Observable,
  catchError,
  from,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { StatusPostgresEntity } from '../entities';
import { IRepositoryBase } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

export class StatusPostgresRepository
  implements IRepositoryBase<StatusPostgresEntity>
{
  constructor(
    @InjectRepository(StatusPostgresEntity)
    private statusPostgresEntity: Repository<StatusPostgresEntity>,
  ) {}

  create(entity: StatusPostgresEntity): Observable<StatusPostgresEntity> {
    return from(this.statusPostgresEntity.save(entity)).pipe(
      catchError((error: Error) => {
        throw new ConflictException(
          'Error while creating status',
          error.message,
        );
      }),
    );
  }

  update(
    entityId: string,
    entity: StatusPostgresEntity,
  ): Observable<StatusPostgresEntity> {
    return from(
      this.findOneById(entityId).pipe(
        switchMap((status: StatusPostgresEntity) => {
          return from(
            this.statusPostgresEntity.save({
              ...status,
              ...entity,
              id: status.id,
            }),
          ).pipe(
            catchError((error: Error) => {
              throw new ConflictException(
                'Error while updating status',
                error.message,
              );
            }),
          );
        }),
      ),
    );
  }

  delete(entityId: string): Observable<StatusPostgresEntity> {
    return from(
      this.findOneById(entityId).pipe(
        switchMap((status: StatusPostgresEntity) => {
          return from(this.statusPostgresEntity.remove(status)).pipe(
            catchError((error: Error) => {
              throw new ConflictException(
                'Error while deleting status',
                error.message,
              );
            }),
          );
        }),
      ),
    );
  }

  findAll(): Observable<StatusPostgresEntity[]> {
    return from(this.statusPostgresEntity.find()).pipe(
      catchError((error: Error) => {
        throw new ConflictException(
          'Error while getting status list',
          error.message,
        );
      }),
    );
  }

  findOneById(entityId: string): Observable<StatusPostgresEntity> {
    return from(
      this.statusPostgresEntity.findOne({
        where: { id: entityId },
      }),
    ).pipe(
      catchError((error: Error) => {
        throw new ConflictException(
          'Error while getting status by id',
          error.message,
        );
      }),
      switchMap((status: StatusPostgresEntity | undefined | null) =>
        status
          ? of(status)
          : throwError(new NotFoundException('Status not found')),
      ),
    );
  }
}
