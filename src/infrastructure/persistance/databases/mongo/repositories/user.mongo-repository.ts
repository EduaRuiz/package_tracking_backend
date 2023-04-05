import {
  Observable,
  catchError,
  from,
  iif,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { IRepositoryBase } from './interfaces';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserMongoModel } from '../models';

export class UserMongoRepository implements IRepositoryBase<UserMongoModel> {
  constructor(
    @InjectModel(UserMongoModel.name)
    private stockMongoModel: Model<UserMongoModel>,
  ) {}

  create(entity: UserMongoModel): Observable<UserMongoModel> {
    return from(this.stockMongoModel.create(entity)).pipe(
      catchError((error: Error) => {
        error.message = 'Conflict while creating user';
        throw error;
      }),
    );
  }

  update(entityId: string, entity: UserMongoModel): Observable<UserMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap((user: UserMongoModel) => {
        return from(
          this.stockMongoModel.findByIdAndUpdate(
            { _id: entityId.toString() },
            { ...user, ...entity, _id: entityId },
            { new: true },
          ),
        ).pipe(
          catchError((error: Error) => {
            error.message = 'Conflict while updating user';
            throw error;
          }),
        );
      }),
    );
  }

  delete(entityId: string): Observable<UserMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap(() => {
        return from(
          this.stockMongoModel.findByIdAndDelete({
            _id: entityId.toString(),
          }),
        ).pipe(
          catchError((error: Error) => {
            error.message = 'Conflict while deleting user';
            throw error;
          }),
        );
      }),
    );
  }

  findAll(): Observable<UserMongoModel[]> {
    return from(this.stockMongoModel.find().exec()).pipe(
      catchError((error: Error) => {
        error.message = 'Error while getting user list';
        throw error;
      }),
    );
  }

  findOneById(entityId: string): Observable<UserMongoModel> {
    return from(
      this.stockMongoModel.findById({ _id: entityId.toString() }),
    ).pipe(
      catchError((error: Error) => {
        error.message = 'Conflict while getting user by ID';
        throw error;
      }),
      switchMap((user: UserMongoModel) =>
        iif(
          () => user === null,
          throwError(() => new NotFoundException('User not found')),
          of(user),
        ),
      ),
    );
  }
}
