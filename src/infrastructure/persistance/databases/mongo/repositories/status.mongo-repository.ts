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
import { StatusMongoModel } from '../models';
import { MongoServerError } from 'mongodb';

export class StatusMongoRepository
  implements IRepositoryBase<StatusMongoModel>
{
  constructor(
    @InjectModel(StatusMongoModel.name)
    private stockMongoModel: Model<StatusMongoModel>,
  ) {}

  create(entity: StatusMongoModel): Observable<StatusMongoModel> {
    return from(this.stockMongoModel.create(entity)).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while creating status');
        throw new MongoServerError(error);
      }),
    );
  }

  update(
    entityId: string,
    entity: StatusMongoModel,
  ): Observable<StatusMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap((status: StatusMongoModel) => {
        return from(
          this.stockMongoModel.findByIdAndUpdate(
            { _id: entityId.toString() },
            { ...status, ...entity, _id: entityId },
            { new: true },
          ),
        ).pipe(
          catchError((error: MongoServerError) => {
            error.cause = new Error('Conflict while updating status');
            throw new MongoServerError(error);
          }),
        );
      }),
    );
  }

  delete(entityId: string): Observable<StatusMongoModel> {
    return this.findOneById(entityId).pipe(
      switchMap(() => {
        return from(
          this.stockMongoModel.findByIdAndDelete({
            _id: entityId.toString(),
          }),
        ).pipe(
          catchError((error: MongoServerError) => {
            error.cause = new Error('Conflict while deleting status');
            throw new MongoServerError(error);
          }),
        );
      }),
    );
  }

  findAll(): Observable<StatusMongoModel[]> {
    return from(this.stockMongoModel.find().exec()).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting all statuses');
        throw new MongoServerError(error);
      }),
    );
  }

  findOneById(entityId: string): Observable<StatusMongoModel> {
    return from(
      this.stockMongoModel.findById({ _id: entityId.toString() }),
    ).pipe(
      catchError((error: MongoServerError) => {
        error.cause = new Error('Conflict while getting status by id');
        throw new MongoServerError(error);
      }),
      switchMap((status: StatusMongoModel) =>
        iif(
          () => status === null,
          throwError(() => new NotFoundException('Status not found!')),
          of(status),
        ),
      ),
    );
  }
}
