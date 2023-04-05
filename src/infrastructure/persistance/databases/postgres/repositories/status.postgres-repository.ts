import { Observable, catchError, from, of, switchMap, throwError } from 'rxjs';
import { StatusPostgresEntity } from '../entities';
import { IRepositoryBase } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class StatusPostgresRepository
  implements IRepositoryBase<StatusPostgresEntity>
{
  constructor(
    @InjectRepository(StatusPostgresEntity)
    private statusPostgresEntity: Repository<StatusPostgresEntity>,
  ) {}

  create(entity: StatusPostgresEntity): Observable<StatusPostgresEntity> {
    return from(this.statusPostgresEntity.save(entity)).pipe(
      catchError((error: QueryFailedError) => {
        error.message = 'Error while creating status';
        throw error;
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
            catchError((error: QueryFailedError) => {
              error.message = 'Error while updating status';
              throw error;
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
            catchError((error: QueryFailedError) => {
              error.message = 'Error while deleting status';
              throw error;
            }),
          );
        }),
      ),
    );
  }

  findAll(): Observable<StatusPostgresEntity[]> {
    return from(this.statusPostgresEntity.find()).pipe(
      catchError((error: QueryFailedError) => {
        error.message = 'Error while getting status list';
        throw error;
      }),
    );
  }

  findOneById(entityId: string): Observable<StatusPostgresEntity> {
    return from(
      this.statusPostgresEntity.findOne({
        where: { id: entityId },
      }),
    ).pipe(
      catchError((error: QueryFailedError) => {
        error.message = 'Error while getting status by id';
        throw error;
      }),
      switchMap((status: StatusPostgresEntity | undefined | null) =>
        status
          ? of(status)
          : throwError(new NotFoundException('Status not found')),
      ),
    );
  }
}
