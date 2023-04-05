import { Observable, catchError, from, of, switchMap, throwError } from 'rxjs';
import { UserPostgresEntity } from '../entities';
import { IRepositoryBase } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class UserPostgresRepository
  implements IRepositoryBase<UserPostgresEntity>
{
  constructor(
    @InjectRepository(UserPostgresEntity)
    private userPostgresEntity: Repository<UserPostgresEntity>,
  ) {}

  create(entity: UserPostgresEntity): Observable<UserPostgresEntity> {
    return from(this.userPostgresEntity.save(entity)).pipe(
      catchError((error: QueryFailedError) => {
        error.message = 'Error while creating user';
        throw error;
      }),
    );
  }

  update(
    entityId: string,
    entity: UserPostgresEntity,
  ): Observable<UserPostgresEntity> {
    return from(
      this.findOneById(entityId).pipe(
        switchMap((user: UserPostgresEntity) => {
          return from(
            this.userPostgresEntity.save({
              ...user,
              ...entity,
              id: user.id,
            }),
          ).pipe(
            catchError((error: QueryFailedError) => {
              error.message = 'Error while updating user';
              throw error;
            }),
          );
        }),
      ),
    );
  }

  delete(entityId: string): Observable<UserPostgresEntity> {
    return from(
      this.findOneById(entityId).pipe(
        switchMap((user: UserPostgresEntity) => {
          return from(this.userPostgresEntity.remove(user)).pipe(
            catchError((error: QueryFailedError) => {
              error.message = 'Error while deleting user';
              throw error;
            }),
          );
        }),
      ),
    );
  }

  findAll(): Observable<UserPostgresEntity[]> {
    return from(this.userPostgresEntity.find()).pipe(
      catchError((error: QueryFailedError) => {
        error.message = 'Error while getting users';
        throw error;
      }),
    );
  }

  findOneById(entityId: string): Observable<UserPostgresEntity> {
    return from(
      this.userPostgresEntity.findOne({
        where: { id: entityId },
      }),
    ).pipe(
      catchError((error: QueryFailedError) => {
        error.message = 'Error while getting user by id';
        throw error;
      }),
      switchMap((user: UserPostgresEntity | undefined | null) =>
        user ? of(user) : throwError(new NotFoundException('User not found')),
      ),
    );
  }
}
