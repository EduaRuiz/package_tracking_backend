import {
  Observable,
  catchError,
  from,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { UserPostgresEntity } from '../entities';
import { IRepositoryBase } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

export class UserPostgresRepository
  implements IRepositoryBase<UserPostgresEntity>
{
  constructor(
    @InjectRepository(UserPostgresEntity)
    private userPostgresEntity: Repository<UserPostgresEntity>,
  ) {}

  create(entity: UserPostgresEntity): Observable<UserPostgresEntity> {
    return from(this.userPostgresEntity.save(entity)).pipe(
      catchError((error: Error) => {
        throw new ConflictException('Error while creating user', error.message);
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
            catchError((error: Error) => {
              throw new ConflictException(
                'Error while updating user',
                error.message,
              );
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
            catchError((error: Error) => {
              throw new ConflictException(
                'Error while deleting user',
                error.message,
              );
            }),
          );
        }),
      ),
    );
  }

  findAll(): Observable<UserPostgresEntity[]> {
    return from(this.userPostgresEntity.find()).pipe(
      catchError((error: Error) => {
        throw new ConflictException('Error while getting users', error.message);
      }),
    );
  }

  findOneById(entityId: string): Observable<UserPostgresEntity> {
    return from(
      this.userPostgresEntity.findOne({
        where: { id: entityId },
      }),
    ).pipe(
      catchError((error: Error) => {
        throw new ConflictException(
          'Error while getting user by id',
          error.message,
        );
      }),
      switchMap((user: UserPostgresEntity | undefined | null) =>
        user ? of(user) : throwError(new NotFoundException('User not found')),
      ),
    );
  }
}
